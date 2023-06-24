import { InputFieldProps } from './InputField.types';
import { useFormContext } from '../../utils/form';

const InputField = ({
  name,
  fieldValue,
  onBlur,
  onChange,
  validationMethod,
}: InputFieldProps) => {
  const { setValues, values } = useFormContext();

  return (
    <label>
      <span>{name}</span>
      <input
        value={values[name as keyof typeof values]}
        onChange={(event) => {
          setValues({ [name]: event.target.value });
        }}
      />
    </label>
  );
};

export default InputField;
