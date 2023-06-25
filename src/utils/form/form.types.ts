export interface FormProps {
  validationMethod?: 'change' | 'blur';
  // We want it to be any so it can accept any type/structure of form
  yupSchema?: any;
  defaultValues: FormValues;
}

export interface FormContextProps extends FormProps {
  values: FormValues;
  setValues: (values: FormValues) => void;
  setValue: (key: keyof FormValues, value: any) => void;
  reset: () => void;
  errors: Record<keyof FormValues, string>;
}

// Change this interface according to your form values
export interface FormValues {
  test1: string;
  test2: string;
}
