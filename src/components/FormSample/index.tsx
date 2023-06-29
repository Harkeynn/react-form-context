import { useFormContext } from '../../utils/form';
import type { FormValues } from '../../utils/types';
import InputField from '../InputField';

const FormSample = () => {
  const { register } = useFormContext<FormValues>();
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
      <InputField {...register('forceBlur', { validationMethod: 'blur' })}>
        Blur
      </InputField>
      <InputField {...register('forceChange', { validationMethod: 'change' })}>
        Change
      </InputField>
    </form>
  );
};

export default FormSample;
