import type { FormFieldUpdate, FormValues } from '../../utils/form';

export interface InputFieldProps {
  name: keyof FormValues;
  fieldValue?: string;
  onChange?: FormFieldUpdate;
  onBlur?: FormFieldUpdate;
  validationMethod?: 'change' | 'blur';
  status?: 'error';
  statusMessage?: string;
}
