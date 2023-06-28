import { useState } from 'react';
import './App.css';
import FormSample from './components/FormSample';
import FormValue from './components/FormValue';
import { FormProvider } from './utils/form';
import { object, string } from 'yup';

function App() {
  const [validationMethod, setValidationMethod] = useState<
    'change' | 'blur' | undefined
  >('change');

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
        defaultValues={{ max10: 'test', min3: 'test' }}
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
          <h2>Form context :</h2>
          <FormValue />
        </main>
      </FormProvider>
    </div>
  );
}

export default App;
