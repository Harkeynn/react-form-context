import { FormProps, FormValues } from './form.types';
import FormContext from './FormContext';

const FormProvider = ({
  children,
  ...formProps
}: React.PropsWithChildren<FormProps<FormValues>>) => {
  return (
    <FormContext.Provider value={formProps}>{children}</FormContext.Provider>
  );
};

export default FormProvider;
