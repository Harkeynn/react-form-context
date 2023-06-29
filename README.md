# react-form-context

React context provider for form state management and validation with yup.  
The code to be implemented is in the folder **utils/form**.

## Basic usage

```tsx
// App.tsx
import { FormProvider } from '@/utils/form';
import { MyForm } from '@/components';

export default App = () => (
  <FormProvider
    defaultValues={firstName: 'John', lastName: 'Doe'}
  >
    <MyForm/>
  </FormProvider>
);
```

```tsx
// MyForm.tsx
import { useFormContext } from '@/utils/form';
import { MyInputField } from '@/components';

export default MyForm = () => {
  const { register } = useFormContext();

  return (
    <form>
      <MyInputField {...register('firstName')} />
      <MyInputField {...register('lastname')} />
    </form>
  );
};
```

## FormProvider<T>

Provides context for state management and validation.  
Its generic type `T` default value is `Record<any, any>` and is used to type the data of the form if needed.

### Props (FormProps<T>)

- `defaultValues: T` : default form values
- `validationMethod?: FormValidationMethod` : form validation method, between `change`, `blur` and `undefined` (to submit form via the context's method only)
- `yupSchema?: any` : yup schema for validation
- `onSubmit?: (values: T) => void` : form submit event
- `onValidSubmit?: (values: T) => void` : form submit event that fires only if `yupSchema` is valid

## useFormContext<T>

Provides the `FormProvider`'s children access to the form context.  
Its generic type `T` default value is `Record<any, any>` and is used to type the data of the form if needed.

### Props (FormContextProps<T> extends FormProps<T>)

- `values: T` : form values as they are in the current context (NB: they can differ from the ones submitted)
- `touchedValues: (keyof T)[]` : field keys that have been touched
- `errors: Record<keyof T, string>` : yup errors
- `register: (name: keyof T, options?: Partial<FormField<T>>) => FormField<T>` : this method is used to register a field in the context, it sets the following props of the input/component (and all of them can be overrided by the method's options or directly via the input/component props) :
  - `name: keyof T`
  - `fieldValue: string`
  - `validationMethod?: FormValidationMethod`
  - `status?: FormFieldStatus`
  - `statusMessage?: string`
  - `onChange?: FormFieldUpdate<T>`
- `updateValues: (values: Partial<T>) => void` : update some values of the form
- `submit: () => void` : submit the form
- `reset: () => void` : reset the form to its default values

## Sandbox

In the project directory, you can run `npm start` to start the sandbox (at [http://localhost:3000](http://localhost:3000)).
