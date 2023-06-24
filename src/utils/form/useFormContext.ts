import { useContext } from 'react';
import FormContext from './FormContext';

const useFormContext = () => {
  return useContext(FormContext);
};

export default useFormContext;
