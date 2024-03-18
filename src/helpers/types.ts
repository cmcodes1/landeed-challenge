type InputField = {
  inputType: 'TextInput' | 'RadioButton';
  validation: RegExp | string;
  value: string | number;
};

type SetState = React.Dispatch<React.SetStateAction<{}>>;

type UserPersonalDataInputFields = 'age' | 'gender' | 'name';

type UserPersonalData = {
  age: InputField;
  gender: InputField;
  name: InputField;
};

type ScreenName = 'PersonalDetails' | 'ProfessionalDetails';

type Navigation = {
  navigate: (
    screenName: ScreenName,
    params: {userPersonalData: UserPersonalData},
  ) => any;
};

type UserProfessionalDataInputFields =
  | 'profession'
  | 'what services do you need?';

type UserProfessionalData = {
  profession: InputField;
  'what services do you need?': InputField;
};

export type {
  InputField,
  SetState,
  UserPersonalDataInputFields,
  UserPersonalData,
  ScreenName,
  Navigation,
  UserProfessionalDataInputFields,
  UserProfessionalData,
};
