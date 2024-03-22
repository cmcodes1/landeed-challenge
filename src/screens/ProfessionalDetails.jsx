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

export default function ProfessionalDetails({navigation, route}) {
  const [userProfessionalData, setUserProfessionalData] = useState({});

  const getFormTimeout = useCallback(() => {
    const formTimeoutRef = ref(database, 'formTimeout/');

    onValue(formTimeoutRef, snapshot => {
      if (snapshot.exists()) {
        startTimer(snapshot.val() * 60 * 1000);
      }
    });
  }, [startTimer]);

  const startTimer = useCallback(
    formTimeout => {
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
          {Object.entries(userProfessionalData).map(item => (
            <View key={item[0]} style={styles.row}>
              <Text style={styles.label}>{item[0]}</Text>
              <Input
                inputFieldName={item[0]}
                inputField={item[1]}
                onPress={text =>
                  updateUserProfessionalData(
                    item[0],
                    text,
                    userProfessionalData,
                    setUserProfessionalData,
                  )
                }
              />
            </View>
          ))}
          <Button
            title="Submit"
            onPress={() =>
              handleSubmit(route.params.userPersonalData, userProfessionalData)
            }
          />
        </>
      )}
    </View>
  );
}
