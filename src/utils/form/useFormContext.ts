import { useContext } from 'react';
import FormContext from './FormContext';

const useFormContext = () => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error(
      'Context not found. Make sure to use the useFormContext hook inside the FormProvider.'
    );
  }

  return context;
};

export default useFormContext;
