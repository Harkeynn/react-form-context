import { createContext } from 'react';
import { FormContextProps, FormValues } from './form.types';

const FormContext = createContext<FormContextProps<FormValues> | undefined>(
  undefined
);

export default FormContext;
