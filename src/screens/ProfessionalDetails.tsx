import {View, Text, Button, ActivityIndicator} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {database} from '../../App';
import {styles} from '../styles/styles';
import {onValue, ref} from 'firebase/database';
import {
  getUserProfessionalData,
  handleSubmit,
  resetUserProfessionalData,
  updateUserProfessionalData,
} from '../helpers/helpers';
import Input from '../components/Input/Input';
import {
  InputField,
  UserProfessionalData,
  UserProfessionalDataInputFields,
} from '../helpers/types';
import {ProfessionalDetailsProps} from './types';

export default function ProfessionalDetails({
  navigation,
  route,
}: ProfessionalDetailsProps): React.JSX.Element {
  const [userProfessionalData, setUserProfessionalData] = useState({});

  const startTimer = useCallback(
    (formTimeout: number) => {
      setTimeout(() => {
        resetUserProfessionalData(
          userProfessionalData,
          setUserProfessionalData,
        );
        navigation.navigate('PersonalDetails', {resetData: true});
      }, formTimeout);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [navigation],
  );

  const getFormTimeout = useCallback(() => {
    const formTimeoutRef = ref(database, 'formTimeout/');

    onValue(formTimeoutRef, snapshot => {
      if (snapshot.exists()) {
        startTimer(snapshot.val() * 60 * 1000);
      }
    });
  }, [startTimer]);

  useEffect(() => {
    getUserProfessionalData(setUserProfessionalData);
    getFormTimeout();
  }, [getFormTimeout]);

  return (
    <View style={styles.root}>
      {Object.keys(userProfessionalData).length === 0 ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <>
          {Object.keys(userProfessionalData).length > 0 &&
            Object.entries(userProfessionalData).map(item => (
              <View key={item[0]} style={styles.row}>
                <Text style={styles.label}>{item[0]}</Text>
                <Input
                  inputFieldName={item[0] as UserProfessionalDataInputFields}
                  inputField={item[1] as InputField}
                  onPress={text =>
                    updateUserProfessionalData(
                      item[0] as UserProfessionalDataInputFields,
                      text,
                      userProfessionalData as UserProfessionalData,
                      setUserProfessionalData,
                    )
                  }
                />
              </View>
            ))}
          <Button
            title="Submit"
            onPress={() =>
              handleSubmit(
                route.params.userPersonalData,
                userProfessionalData as UserProfessionalData,
              )
            }
          />
        </>
      )}
    </View>
  );
}
