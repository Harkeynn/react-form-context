import { createContext } from 'react';
import { FormContextProps } from './form.types';

const FormContext = createContext<FormContextProps | undefined>(undefined);

export default FormContext;
