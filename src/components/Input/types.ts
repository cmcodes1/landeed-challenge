import {
  InputField,
  SetState,
  UserPersonalData,
  UserPersonalDataInputFields,
  UserProfessionalData,
  UserProfessionalDataInputFields,
} from '../../helpers/types';
import {Option} from '../RadioButton/types';

type InputProps = {
  inputFieldName: UserPersonalDataInputFields | UserProfessionalDataInputFields;
  inputField: InputField;
  onPress: (
    text: Option,
  ) => (
    field: UserPersonalDataInputFields,
    text: Option,
    userData: UserPersonalData | UserProfessionalData,
    setUserData: SetState,
  ) => void;
};

export type {InputProps};
