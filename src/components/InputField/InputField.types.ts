import { FormValues } from '../../utils/form';

export interface InputFieldProps {
  name: keyof FormValues;
  fieldValue?: string;
  onChange?: (value?: string, name?: keyof FormValues) => void;
  onBlur?: (value?: string) => void;
  validationMethod?: 'change' | 'blur';
  status?: 'error';
  statusMessage?: string;
}
