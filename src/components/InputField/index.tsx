import { InputFieldProps } from './InputField.types';

const InputField = ({
  name,
  fieldValue,
  onBlur,
  onChange,
  validationMethod,
}: InputFieldProps) => {
  return <span>Input field {name}</span>;
};

export default InputField;
