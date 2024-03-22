import {
  InputField,
  UserPersonalDataInputFields,
  UserProfessionalDataInputFields,
} from '../../helpers/types';
import {Option} from '../RadioButton/types';

type InputProps = {
  inputFieldName: UserPersonalDataInputFields | UserProfessionalDataInputFields;
  inputField: InputField;
  onPress: (text: Option) => void;
};

export type {InputProps};
