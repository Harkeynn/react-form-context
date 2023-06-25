import { useEffect, useState } from 'react';
import { FormProps, FormValues } from './form.types';
import FormContext from './FormContext';
import { ValidationError } from 'yup';

const FormProvider = ({
  children,
  ...formProps
}: React.PropsWithChildren<FormProps>) => {
  const [values, setValues] = useState<FormValues>(formProps.defaultValues);
  const [errors, setErrors] = useState<Record<keyof FormValues, string>>(
    {} as Record<keyof FormValues, string>
  );

  const reset = () => {
    setValues(formProps.defaultValues);
  };

  const setValue = (key: keyof FormValues, value: any) => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  useEffect(() => {
    if (formProps.yupSchema) {
      formProps.yupSchema
        .validate(values, { abortEarly: false })
        .catch((yupError: ValidationError) => {
          setErrors(
            yupError.inner.reduce((result, { path, message }) => {
              result[path as keyof FormValues] = message;
              return result;
            }, {} as Record<keyof FormValues, string>)
          );
        });
    }
  }, [values, formProps.yupSchema]);

  return (
    <FormContext.Provider
      value={{
        ...formProps,
        values,
        setValues,
        reset,
        setValue,
        errors,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
