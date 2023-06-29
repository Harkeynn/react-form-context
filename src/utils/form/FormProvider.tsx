import type { PropsWithChildren } from 'react';
import { useCallback, useEffect, useState } from 'react';
import FormContext from './FormContext';
import type {
  FormField,
  FormFieldStatus,
  FormFieldUpdate,
  FormProps,
  FormValidationMethod,
} from './form.types';
import type { ValidationError } from 'yup';

const FormProvider = <T extends Record<any, any>>({
  children,
  ...formProps
}: PropsWithChildren<FormProps<T>>) => {
  const [values, setValues] = useState<T>(formProps.defaultValues);
  const [touchedValues, setTouchedValues] = useState<(keyof T)[]>([]);
  const [errors, setErrors] = useState<Record<keyof T, string>>(
    {} as Record<keyof T, string>
  );

  // Easier way to update the values
  const updateValues = (newValues: Partial<T>) => {
    setValues((prevValues) => ({
      ...prevValues,
      ...newValues,
    }));
  };

  const submit = () => {
    formProps.onSubmit?.(values);
    if (Object.keys(errors).length === 0) {
      formProps.onValidSubmit?.(values);
    }
  };

  // Validate yup schema and set errors accordingly
  // We have to get values and errors through the args to avoid dependencies and unwanted re-renders
  // If the previous errors are not provided, fires onSubmit and onValidSubmit
  // (it allows us to determine wether we to trigger the submit or just update the context)
  const validation = useCallback(
    (newValues: T, prevErrors?: Record<keyof T, string>) => {
      !prevErrors && formProps.onSubmit?.(newValues);
      if (formProps.yupSchema) {
        formProps.yupSchema
          .validate(newValues, { abortEarly: false })
          .then(() => {
            !prevErrors && formProps.onValidSubmit?.(newValues);
            if (Object.keys(prevErrors || {}).length !== 0) {
              setErrors({} as Record<keyof T, string>);
            }
          })
          .catch((yupError: ValidationError) => {
            const newErrors = yupError.inner.reduce(
              (result, { path, message }) => {
                result[path as keyof T] = message;
                return result;
              },
              {} as Record<keyof T, string>
            );
            if (JSON.stringify(newErrors) !== JSON.stringify(prevErrors)) {
              setErrors(newErrors);
            }
          });
      }
    },
    // We keep the dependencies as accurate as possible to avoid unnecessary re-renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formProps.onSubmit, formProps.onValidSubmit, formProps.yupSchema]
  );

  const eventUpdate = useCallback(
    (
      value: any,
      eventType: 'change' | 'blur',
      name: keyof T,
      validationMethod?: FormValidationMethod
    ) => {
      // We have to use this var to avoid the double call of validation
      // since react calls the setState methods twice to be sure it doesn't mutate the state
      let called = false;
      setValues((prevValues) => {
        const newValues = { ...prevValues, [name]: value || '' };
        if (
          (validationMethod || formProps.validationMethod) === eventType &&
          !called
        ) {
          called = true;
          // We have to validate through the setState in order to avoid any dependencies that will cause unwanted re-renders
          validation(newValues);
        }
        return newValues;
      });
    },
    [formProps.validationMethod, validation]
  );

  const onChange: FormFieldUpdate<T> = useCallback(
    (value, name, validationMethod) => {
      if (name) {
        eventUpdate(value, 'change', name, validationMethod);

        // Setup touched values
        setTouchedValues((prevTValues) => {
          const isValueTouched = prevTValues.includes(name);
          if (value !== formProps.defaultValues[name] && !isValueTouched) {
            return [...prevTValues, name];
          }
          if (value === formProps.defaultValues[name] && isValueTouched) {
            return prevTValues.filter((tValue) => tValue !== name);
          }
          return prevTValues;
        });
      }
    },
    [formProps.defaultValues, eventUpdate]
  );

  const onBlur: FormFieldUpdate<T> = useCallback(
    (value, name, validationMethod) => {
      if (name) {
        eventUpdate(value, 'blur', name, validationMethod);
      }
    },
    [eventUpdate]
  );

  // We check if the current values are different from the default ones to avoid unnecessary re-renders
  // Then we reset values, errors and touched keys
  const reset = () => {
    if (JSON.stringify(formProps.defaultValues) !== JSON.stringify(values)) {
      updateValues(formProps.defaultValues);
      validation(formProps.defaultValues);
      setTouchedValues([]);
    }
  };

  // This method provides all the necessary stuff for a component so it can be registered into the context
  const register = (name: keyof T, options?: Partial<FormField<T>>) => {
    let status: FormFieldStatus;
    if (errors[name]) {
      status = 'error';
    } else if (touchedValues.includes(name)) {
      status = 'touched';
    }

    return {
      name,
      fieldValue: values[name],
      status,
      onChange,
      onBlur,
      ...options,
    } as FormField<T>;
  };

  // Errors update
  useEffect(() => {
    validation(values, errors);
    // We don't want to add errors to the dependencies to avoid unnecessary loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, formProps.yupSchema]);

  return (
    <FormContext.Provider
      value={{
        ...formProps,
        values,
        touchedValues,
        errors,
        register,
        updateValues,
        submit,
        reset,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
