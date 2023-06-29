import { FormValidationMethod } from '../../utils/form';

export interface FormActionsProps {
  validationMethod: FormValidationMethod;
  onMethodChange: (method: FormValidationMethod) => void;
}
