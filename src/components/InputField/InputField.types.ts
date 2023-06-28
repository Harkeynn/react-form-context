import type {
  FormFieldStatus,
  FormFieldUpdate,
  FormValidationMethod,
  FormValues,
} from '../../utils/form';

export interface InputFieldProps {
  name: keyof FormValues;
  fieldValue?: string;
  validationMethod?: FormValidationMethod;
  status?: FormFieldStatus;
  statusMessage?: string;
  onChange?: FormFieldUpdate;
  onBlur?: FormFieldUpdate;
}
