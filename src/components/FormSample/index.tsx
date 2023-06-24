import { useFormContext } from '../../utils/form';
import InputField from '../InputField';

const FormSample = () => {
  const { reset } = useFormContext();
  return (
    <form>
      <InputField name="test" />
      <button type="button" onClick={reset}>
        Reset
      </button>
    </form>
  );
};

export default FormSample;
