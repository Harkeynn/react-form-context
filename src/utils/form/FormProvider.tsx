import { useState } from 'react';
import { FormProps, FormValues } from './form.types';
import FormContext from './FormContext';

const FormProvider = ({
  children,
  ...formProps
}: React.PropsWithChildren<FormProps<FormValues>>) => {
  const [values, setValues] = useState<Partial<FormValues>>(
    formProps.defaultValues
  );

  const reset = () => {
    setValues(formProps.defaultValues);
  };

  return (
    <FormContext.Provider
      value={{
        ...formProps,
        values,
        setValues,
        reset,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
