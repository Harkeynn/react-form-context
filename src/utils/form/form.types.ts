export interface FormProps<T = any> {
  validationMethod?: 'change' | 'blur';
  // We want it to be any so it can accept any type/structure of form
  yupSchema?: any;
  defaultValues: T;
}

export interface FormContextProps<T> extends FormProps<T> {
  values: Partial<T>;
  setValues: (values: Partial<T>) => void;
  reset: () => void;
}

// Change this interface according to your form values
export interface FormValues {
  test: string;
}
