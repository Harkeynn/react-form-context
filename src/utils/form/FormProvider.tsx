import type { PropsWithChildren } from 'react';
import { useCallback, useEffect, useReducer, useState } from 'react';
import FormContext from './FormContext';
import type {
  FormField,
  FormFieldStatus,
  FormFieldUpdate,
  FormProps,
  FormValues,
} from './form.types';
import type { ValidationError } from 'yup';

const formReducer = (state: FormValues, payload: Partial<FormValues>) => {
  return {
    ...state,
    ...payload,
  };
};

const FormProvider = ({
  children,
  ...formProps
}: PropsWithChildren<FormProps>) => {
  const [values, updateValues] = useReducer(
    formReducer,
    formProps.defaultValues
  );
  const [touchedValues, setTouchedValues] = useState<(keyof FormValues)[]>([]);
  const [errors, setErrors] = useState<Record<keyof FormValues, string>>(
    {} as Record<keyof FormValues, string>
  );

  const handleUpdate: FormFieldUpdate = useCallback(
    (value, name) => {
      if (name) {
        updateValues({ [name]: value });
        setTouchedValues((prevTValues) => {
          const isValueTouched = prevTValues.includes(name);
          if (value !== formProps.defaultValues[name] && !isValueTouched) {
            return [...prevTValues, name];
          }
          if (value === formProps.defaultValues[name] && isValueTouched) {
            return prevTValues.filter((tValue) => tValue !== name);
          }
          return prevTValues;
        });
      }
    },
    [formProps.defaultValues]
  );

  const reset = () => {
    updateValues(formProps.defaultValues);
    setTouchedValues([]);
  };

  const register = (name: keyof FormValues, options?: Partial<FormField>) => {
    let status: FormFieldStatus;
    if (errors[name]) {
      status = 'error';
    } else if (touchedValues.includes(name)) {
      status = 'touched';
    }

    const updateEvents: {
      onChange?: FormFieldUpdate;
      onBlur?: FormFieldUpdate;
    } = {
      onChange: undefined,
      onBlur: undefined,
    };
    const validationMethod =
      options?.validationMethod || formProps.validationMethod;
    updateEvents[validationMethod === 'blur' ? 'onBlur' : 'onChange'] =
      handleUpdate;

    return {
      name,
      fieldValue: values[name],
      status,
      ...updateEvents,
      ...options,
    } as FormField;
  };

  useEffect(() => {
    if (formProps.yupSchema) {
      formProps.yupSchema
        .validate(values, { abortEarly: false })
        .then(() => {
          if (Object.keys(errors).length !== 0) {
            setErrors({} as Record<keyof FormValues, string>);
          }
        })
        .catch((yupError: ValidationError) => {
          const newErrors = yupError.inner.reduce(
            (result, { path, message }) => {
              result[path as keyof FormValues] = message;
              return result;
            },
            {} as Record<keyof FormValues, string>
          );
          if (JSON.stringify(newErrors) !== JSON.stringify(errors)) {
            setErrors(newErrors);
          }
        });
    }
    // We don't want to add errors to the dependencies to avoid unnecessary loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, formProps.yupSchema]);

  return (
    <FormContext.Provider
      value={{
        ...formProps,
        values,
        touchedValues,
        errors,
        register,
        updateValues,
        reset,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
