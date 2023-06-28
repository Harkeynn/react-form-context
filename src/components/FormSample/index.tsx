import { useFormContext } from '../../utils/form';
import InputField from '../InputField';

const FormSample = () => {
  const { reset, register } = useFormContext();
  return (
    <form>
      <InputField {...register('test1')} statusMessage="Max 10" />
      <InputField {...register('test2')} statusMessage="Min 3" />
      <button type="button" onClick={reset}>
        Reset
      </button>
    </form>
  );
};

export default FormSample;
