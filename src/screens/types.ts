import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {RouteProp} from '@react-navigation/native';

type PersonalDetailsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PersonalDetails'
>;

type PersonalDetailsRouteProp = RouteProp<
  RootStackParamList,
  'PersonalDetails'
>;

type PersonalDetailsProps = {
  navigation: PersonalDetailsNavigationProp;
  route: PersonalDetailsRouteProp;
};

type ProfessionalDetailsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProfessionalDetails'
>;

type ProfessionalDetailsRouteProp = RouteProp<
  RootStackParamList,
  'ProfessionalDetails'
>;

type ProfessionalDetailsProps = {
  navigation: ProfessionalDetailsNavigationProp;
  route: ProfessionalDetailsRouteProp;
};

export type {PersonalDetailsProps, ProfessionalDetailsProps};
