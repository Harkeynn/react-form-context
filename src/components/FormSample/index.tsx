import { useFormContext } from '../../utils/form';
import InputField from '../InputField';

const FormSample = () => {
  const { reset } = useFormContext();
  return (
    <form>
      <InputField name="test1" statusMessage="Max 10" />
      <InputField name="test2" statusMessage="Min 3" />
      <button type="button" onClick={reset}>
        Reset
      </button>
    </form>
  );
};

export default FormSample;
