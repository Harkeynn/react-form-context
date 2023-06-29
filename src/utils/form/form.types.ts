export type FormValidationMethod = 'change' | 'blur' | undefined;

export interface FormProps<T> {
  validationMethod?: FormValidationMethod;
  // We want it to be any so it can accept any type/structure of form
  yupSchema?: any;
  defaultValues: T;
  changeDebounceTime?: number;
  onSubmit?: (values: T) => void;
  onValidSubmit?: (values: T) => void;
}

export type FormFieldStatus = 'error' | 'touched' | undefined;

export type FormFieldUpdate<T> = (
  value?: any,
  name?: keyof T,
  validationMethod?: FormValidationMethod
) => void;

export interface FormField<T> {
  name: keyof T;
  fieldValue: string;
  validationMethod?: FormValidationMethod;
  status?: FormFieldStatus;
  statusMessage?: string;
  onChange?: FormFieldUpdate<T>;
  onBlur?: FormFieldUpdate<T>;
}

export interface FormContextProps<T> extends FormProps<T> {
  values: T;
  touchedValues: (keyof T)[];
  errors: Record<keyof T, string>;
  register: (name: keyof T, options?: Partial<FormField<T>>) => FormField<T>;
  updateValues: (values: Partial<T>) => void;
  submit: () => void;
  reset: () => void;
}
