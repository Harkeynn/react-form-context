import type { FormValues } from '../../utils/form';
import useFormContext from '../../utils/form/useFormContext';

const FormValue = () => {
  const { values, touchedValues } = useFormContext();

  const isValueTouched = (key: keyof FormValues) =>
    touchedValues.includes(key) ? 'Touched' : 'Untouched';

  return (
    <ul>
      {Object.keys(values).map((key) => (
        <li key={key}>
          {key}: {values[key as keyof FormValues]} (
          {isValueTouched(key as keyof FormValues)})
        </li>
      ))}
    </ul>
  );
};

export default FormValue;
