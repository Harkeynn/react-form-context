import { createContext } from 'react';
import { FormContextProps } from './form.types';

const FormContext = createContext<FormContextProps<any> | undefined>(undefined);

export default FormContext;
