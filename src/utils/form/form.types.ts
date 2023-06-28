export interface FormProps {
  validationMethod?: 'change' | 'blur';
  // We want it to be any so it can accept any type/structure of form
  yupSchema?: any;
  defaultValues: FormValues;
}

export interface FormField {
  name: keyof FormValues;
  fieldValue: string;
  onChange?: (value?: string) => void;
  onBlur?: (value?: string) => void;
  validationMethod?: 'change' | 'blur';
  status?: 'error';
  statusMessage?: string;
}

export interface FormContextProps extends FormProps {
  values: FormValues;
  updateValues: (values: Partial<FormValues>) => void;
  reset: () => void;
  errors: Record<keyof FormValues, string>;
  register: (name: keyof FormValues, options?: Partial<FormField>) => FormField;
}

// Change this interface according to your form values
export interface FormValues {
  test1: string;
  test2: string;
}
