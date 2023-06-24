import { createContext } from 'react';
import { FormProps, FormValues } from './form.types';

const FormContext = createContext<FormProps<FormValues> | undefined>(undefined);

export default FormContext;
