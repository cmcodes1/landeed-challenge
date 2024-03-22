import {UserPersonalData} from '../helpers/types';

type RootStackParamList = {
  PersonalDetails: {resetData: boolean};
  ProfessionalDetails: {userPersonalData: UserPersonalData};
};

export type {RootStackParamList};
