import type { PropsWithChildren } from 'react';
import { useCallback, useEffect, useState } from 'react';
import FormContext from './FormContext';
import type {
  FormField,
  FormFieldStatus,
  FormFieldUpdate,
  FormProps,
  FormValues,
} from './form.types';
import type { ValidationError } from 'yup';

const FormProvider = ({
  children,
  ...formProps
}: PropsWithChildren<FormProps>) => {
  const [values, setValues] = useState<FormValues>(formProps.defaultValues);
  const [touchedValues, setTouchedValues] = useState<(keyof FormValues)[]>([]);
  const [errors, setErrors] = useState<Record<keyof FormValues, string>>(
    {} as Record<keyof FormValues, string>
  );

  const updateValues = (newValues: Partial<FormValues>) => {
    setValues((prevValues) => ({
      ...prevValues,
      ...newValues,
    }));
  };

  const submit = () => {
    formProps.onSubmit?.(values);
    if (Object.keys(errors).length === 0) {
      formProps.onValidSubmit?.(values);
    }
  };

  const validation = useCallback(
    (newValues: FormValues, prevErrors?: Record<keyof FormValues, string>) => {
      !prevErrors && formProps.onSubmit?.(newValues);
      if (formProps.yupSchema) {
        formProps.yupSchema
          .validate(newValues, { abortEarly: false })
          .then(() => {
            !prevErrors && formProps.onValidSubmit?.(newValues);
            if (Object.keys(prevErrors || {}).length !== 0) {
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
            if (JSON.stringify(newErrors) !== JSON.stringify(prevErrors)) {
              setErrors(newErrors);
            }
          });
      }
    },
    // We keep the dependencies as accurate as possible to avoid unnecessary re-renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formProps.onSubmit, formProps.onValidSubmit, formProps.yupSchema]
  );

  const onChange: FormFieldUpdate = useCallback(
    (value, name, validationMethod) => {
      if (name) {
        // We have to use this var to avoid the double call of validation
        // since react calls the setState methods twice to be sure it doesn't mutate the state
        let called = false;
        setValues((prevValues) => {
          const newValues = { ...prevValues, [name]: value || '' };
          if (
            (validationMethod || formProps.validationMethod) === 'change' &&
            !called
          ) {
            called = true;
            validation(newValues);
          }
          return newValues;
        });
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
    [formProps.defaultValues, formProps.validationMethod, validation]
  );

  const onBlur: FormFieldUpdate = useCallback(
    (value, name, validationMethod) => {
      if (name) {
        // We have to use this var to avoid the double call of validation
        // since react calls the setState methods twice to be sure it doesn't mutate the state
        let called = false;
        setValues((prevValues) => {
          const newValues = prevValues;
          newValues[name] = value || '';
          if (
            (validationMethod || formProps.validationMethod) === 'blur' &&
            !called
          ) {
            called = true;
            validation(newValues);
          }
          return newValues;
        });
      }
    },
    [formProps.validationMethod, validation]
  );

  const reset = () => {
    if (JSON.stringify(formProps.defaultValues) !== JSON.stringify(values)) {
      updateValues(formProps.defaultValues);
      validation(formProps.defaultValues);
      setTouchedValues([]);
    }
  };

  const register = (name: keyof FormValues, options?: Partial<FormField>) => {
    let status: FormFieldStatus;
    if (errors[name]) {
      status = 'error';
    } else if (touchedValues.includes(name)) {
      status = 'touched';
    }

    return {
      name,
      fieldValue: values[name],
      status,
      onChange,
      onBlur,
      ...options,
    } as FormField;
  };

  useEffect(() => {
    validation(values, errors);
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
        submit,
        reset,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
