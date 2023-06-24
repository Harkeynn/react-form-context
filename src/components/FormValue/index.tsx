import useFormContext from '../../utils/form/useFormContext';

const FormValue = () => {
  const context = useFormContext();

  if (!context) {
    return <div>Context not available</div>;
  }

  return (
    <ul>
      <li>{context.defaultValues?.test}</li>
      <li>{context.yupSchema}</li>
      <li>{context.validationMethod}</li>
    </ul>
  );
};

export default FormValue;
