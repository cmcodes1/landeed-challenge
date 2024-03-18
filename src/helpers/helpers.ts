import {Alert} from 'react-native';
import {
  InputField,
  Navigation,
  SetState,
  UserPersonalData,
  UserPersonalDataInputFields,
  UserProfessionalData,
  UserProfessionalDataInputFields,
} from './types';
import {Option} from '../components/RadioButton/types';
import {onValue, ref, set} from 'firebase/database';
import {database} from '../../App';

const isInputInvalid = (input: InputField) => {
  const isInvalid: boolean = !new RegExp(input.validation, 'i').test(
    input.value.toString(),
  );

  return isInvalid;
};

const getUserPersonalData = (setUserPersonalData: SetState) => {
  const userPersonalDetailsRef = ref(database, 'userDetails/personalDetails/');

  onValue(userPersonalDetailsRef, snapshot => {
    if (snapshot.exists()) {
      console.log('personalDetails', snapshot.val());
      setUserPersonalData(snapshot.val());
    }
  });
};

const updateUserPersonalData = (
  field: UserPersonalDataInputFields,
  text: Option,
  userPersonalData: UserPersonalData | any,
  setUserPersonalData: SetState,
) => {
  const userPersonalDataCopy = {...userPersonalData};
  userPersonalDataCopy[field].value = field === 'age' ? Number(text) : text;
  setUserPersonalData(userPersonalDataCopy);
};

const resetUserPersonalData = (
  userPersonalData: UserPersonalData | any,
  setUserPersonalData: SetState,
) => {
  const userPersonalDataCopy = {...userPersonalData};
  for (const key in userPersonalDataCopy) {
    userPersonalDataCopy[key].value = '';
  }
  setUserPersonalData(userPersonalDataCopy);
};

const goToNextPage = (
  userPersonalData: UserPersonalData | any,
  navigation: Navigation,
) => {
  let allFieldsValid = true;

  for (const key in userPersonalData) {
    if (!userPersonalData[key].value || isInputInvalid(userPersonalData[key])) {
      allFieldsValid = false;
    }
  }

  allFieldsValid
    ? navigation.navigate('ProfessionalDetails', {
        userPersonalData,
      })
    : Alert.alert(
        'Invalid details!',
        'Please check if the inputs you have entered are valid!',
      );
};

const getUserProfessionalData = (setUserProfessionalData: SetState) => {
  const userProfessionalDetailsRef = ref(
    database,
    'userDetails/professionalDetails/',
  );

  onValue(userProfessionalDetailsRef, snapshot => {
    if (snapshot.exists()) {
      console.log('professionalDetails', snapshot.val());
      setUserProfessionalData(snapshot.val());
    }
  });
};

const updateUserProfessionalData = (
  field: UserProfessionalDataInputFields,
  text: Option,
  userProfessionalData: UserProfessionalData,
  setUserProfessionalData: SetState,
) => {
  const userProfessionalDataCopy = {...userProfessionalData};
  userProfessionalDataCopy[field].value = text;
  setUserProfessionalData(userProfessionalDataCopy);
};

const resetUserProfessionalData = (
  userProfessionalData: UserProfessionalData | any,
  setUserProfessionalData: SetState,
) => {
  const userProfessionalDataCopy = {...userProfessionalData};
  for (const key in userProfessionalDataCopy) {
    userProfessionalDataCopy[key].value = '';
  }
  setUserProfessionalData(userProfessionalDataCopy);
};

const handleSubmit = (
  personalDetails: UserPersonalData,
  professionalDetails: UserProfessionalData,
) => {
  const userDetails = {personalDetails, professionalDetails};
  const userDetailsRef = ref(database, 'userDetails/');

  let allFieldsValid = true;

  if (
    !professionalDetails.profession.value ||
    isInputInvalid(professionalDetails.profession)
  ) {
    allFieldsValid = false;
  }

  allFieldsValid
    ? (set(userDetailsRef, userDetails),
      Alert.alert(
        'Details submitted successfully!',
        'Thank you for submitting your details',
      ))
    : Alert.alert(
        'Invalid details!',
        'Please check if the inputs you have entered are valid!',
      );
};

export {
  isInputInvalid,
  getUserPersonalData,
  updateUserPersonalData,
  resetUserPersonalData,
  goToNextPage,
  getUserProfessionalData,
  updateUserProfessionalData,
  resetUserProfessionalData,
  handleSubmit,
};
