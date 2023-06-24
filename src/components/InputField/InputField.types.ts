export interface InputFieldProps {
  name: string;
  fieldValue?: string;
  onChange?: (value?: string) => void;
  onBlur?: (value?: string) => void;
  validationMethod?: 'change' | 'blur';
}
