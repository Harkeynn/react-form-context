export interface FormProps {
  validationMethod?: 'change' | 'blur';
  // We want it to be any so it can accept any type/structure of form
  yupSchema?: any;
  defaultValues: FormValues;
  onSubmit?: (values: FormValues) => void;
  onValidSubmit?: (values: FormValues) => void;
}

export type FormValidationMethod = 'change' | 'blur' | undefined;

export type FormFieldStatus = 'error' | 'touched' | undefined;

export type FormFieldUpdate = (
  value?: string,
  name?: keyof FormValues,
  validationMethod?: FormValidationMethod
) => void;

export interface FormField {
  name: keyof FormValues;
  fieldValue: string;
  validationMethod?: FormValidationMethod;
  status?: FormFieldStatus;
  statusMessage?: string;
  touched?: boolean;
  onChange?: FormFieldUpdate;
  onBlur?: FormFieldUpdate;
}

export interface FormContextProps extends FormProps {
  values: FormValues;
  touchedValues: (keyof FormValues)[];
  errors: Record<keyof FormValues, string>;
  register: (name: keyof FormValues, options?: Partial<FormField>) => FormField;
  updateValues: (values: Partial<FormValues>) => void;
  submit: () => void;
  reset: () => void;
}

// Change this interface according to your form values
export interface FormValues {
  max10: string;
  min3: string;
  forceChange?: string;
  forceBlur?: string;
}
