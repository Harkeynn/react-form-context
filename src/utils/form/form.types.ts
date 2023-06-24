export interface FormProps<T = any> {
  validationMethod?: 'change' | 'blur';
  // We want it to be any so it can accept any type/structure of form
  yupSchema?: any;
  defaultValues?: T;
}

// Change this interface according to your form values
export interface FormValues {
  test: string;
}
