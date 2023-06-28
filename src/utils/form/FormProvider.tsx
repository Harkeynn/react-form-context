import type { PropsWithChildren } from 'react';
import { useCallback, useEffect, useReducer, useState } from 'react';
import FormContext from './FormContext';
import type { FormField, FormProps, FormValues } from './form.types';
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
  const [errors, setErrors] = useState<Record<keyof FormValues, string>>(
    {} as Record<keyof FormValues, string>
  );

  const onChange = useCallback((value?: string, name?: keyof FormValues) => {
    updateValues({ [name as string]: value });
  }, []);

  const reset = () => {
    updateValues(formProps.defaultValues);
  };

  const register = (name: keyof FormValues, options?: Partial<FormField>) => {
    return {
      name,
      fieldValue: values[name],
      onChange,
      status: errors[name] ? 'error' : undefined,
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
        updateValues,
        reset,
        errors,
        register,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
