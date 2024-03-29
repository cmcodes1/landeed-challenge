import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PersonalDetails from '../screens/PersonalDetails';
import ProfessionalDetails from '../screens/ProfessionalDetails';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function NavigationStack(): React.JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName="PersonalDetails"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
      <Stack.Screen
        name="ProfessionalDetails"
        component={ProfessionalDetails}
      />
    </Stack.Navigator>
  );
}
