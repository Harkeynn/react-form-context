import type {
  FormFieldStatus,
  FormFieldUpdate,
  FormValidationMethod,
} from '../../utils/form';
import type { FormValues } from '../../utils/types';

export interface InputFieldProps {
  name: keyof FormValues;
  fieldValue?: string;
  validationMethod?: FormValidationMethod;
  status?: FormFieldStatus;
  statusMessage?: string;
  onChange?: FormFieldUpdate<FormValues>;
  onBlur?: FormFieldUpdate<FormValues>;
}
