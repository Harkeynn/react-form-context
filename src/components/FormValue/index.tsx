import useFormContext from '../../utils/form/useFormContext';

const FormValue = () => {
  const { values } = useFormContext();

  return (
    <ul>
      {Object.keys(values).map((key) => (
        <li key={key}>
          {key}: {values[key as keyof typeof values]}
        </li>
      ))}
    </ul>
  );
};

export default FormValue;
