import { useContext } from 'react';
import FormContext from './FormContext';
import { FormContextProps } from './form.types';

const useFormContext = <T extends Record<any, any>>() => {
  const context = useContext<FormContextProps<T> | undefined>(FormContext);

  if (!context) {
    throw new Error(
      'Context not found. Make sure to use the useFormContext hook inside the FormProvider.'
    );
  }

  return context;
};

export default useFormContext;
