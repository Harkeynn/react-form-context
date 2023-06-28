import { useFormContext } from '../../utils/form';
import InputField from '../InputField';

const FormSample = () => {
  const { reset, register } = useFormContext();
  return (
    <form>
      <h2>Inputs using global validation method</h2>
      <InputField {...register('max10')} statusMessage="Max length 10">
        Max length 10
      </InputField>
      <InputField {...register('min3')} statusMessage="Min length 3">
        Min length 3
      </InputField>
      <h2>Inputs using local validation method</h2>
      <InputField {...register('forceChange', { validationMethod: 'change' })}>
        Change
      </InputField>
      <InputField {...register('forceBlur', { validationMethod: 'blur' })}>
        Blur
      </InputField>
      <button type="button" onClick={reset}>
        Reset
      </button>
    </form>
  );
};

export default FormSample;
