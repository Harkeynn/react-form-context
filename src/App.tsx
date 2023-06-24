import { useState } from 'react';
import './App.css';
import FormSample from './components/FormSample';
import FormValue from './components/FormValue';
import { FormProvider } from './utils/form';

function App() {
  const [validationMethod, setValidationMethod] = useState<
    'change' | 'blur' | undefined
  >('change');

  return (
    <div className="App">
      <header className="App-header">React Form Context</header>
      <FormProvider
        validationMethod={validationMethod}
        yupSchema="schema"
        defaultValues={{ test: 'test' }}
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
          <FormValue />
        </main>
      </FormProvider>
    </div>
  );
}

export default App;
