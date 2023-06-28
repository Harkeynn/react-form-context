import { useState } from 'react';
import { object, string } from 'yup';
import './App.css';
import FormResult from './components/FormResult';
import FormSample from './components/FormSample';
import FormValue from './components/FormValue';
import type { FormValidationMethod, FormValues } from './utils/form';
import { FormProvider } from './utils/form';

function App() {
  const defaultValues = {
    max10: 'test',
    min3: 'test',
    forceBlur: undefined,
    forceChange: undefined,
  };
  const [formValues, setFormValues] = useState<FormValues>(defaultValues);
  const [validationMethod, setValidationMethod] =
    useState<FormValidationMethod>('change');

  const schema = object({
    max10: string().max(10),
    min3: string().min(3),
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Form Context</h1>
      </header>
      <FormProvider
        validationMethod={validationMethod}
        yupSchema={schema}
        onValidSubmit={setFormValues}
        defaultValues={defaultValues}
      >
        <main>
          <FormSample />
          <button
            type="button"
            onClick={() =>
              setValidationMethod(
                validationMethod === 'blur' ? 'change' : 'blur'
              )
            }
          >
            Switch validation method
          </button>
          <hr />
          <div style={{ display: 'flex' }}>
            <FormValue />
            <FormResult values={formValues} />
          </div>
        </main>
      </FormProvider>
    </div>
  );
}

export default App;
