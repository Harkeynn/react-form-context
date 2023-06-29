import { useState } from 'react';
import { object, string } from 'yup';
import './App.css';
import FormActions from './components/FormActions';
import FormResult from './components/FormResult';
import FormSample from './components/FormSample';
import FormValue from './components/FormValue';
import type { FormValidationMethod } from './utils/form';
import { FormProvider } from './utils/form';
import type { FormValues } from './utils/types';

function App() {
  const defaultValues = {
    max10: 'test',
    min3: 'test',
    forceBlur: undefined,
    forceChange: undefined,
  };
  const [formValues, setFormValues] = useState<FormValues>(defaultValues);
  const [validationMethod, setValidationMethod] =
    useState<FormValidationMethod>();

  const schema = object({
    max10: string().max(10),
    min3: string().min(3),
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Form Context</h1>
      </header>
      <FormProvider<FormValues>
        validationMethod={validationMethod}
        yupSchema={schema}
        onValidSubmit={setFormValues}
        defaultValues={defaultValues}
      >
        <main>
          <FormSample />
          <FormActions
            validationMethod={validationMethod}
            onMethodChange={setValidationMethod}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <FormValue />
            <FormResult values={formValues} />
          </div>
        </main>
      </FormProvider>
    </div>
  );
}

export default App;
