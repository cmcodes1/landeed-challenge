import {View, Text, TextInput, Button, ActivityIndicator} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {database} from '../../App';
import {styles} from '../styles/styles';
import {onValue, ref} from 'firebase/database';
import RadioButton from '../components/RadioButton/RadioButton';
import {
  getUserProfessionalData,
  handleSubmit,
  isInputInvalid,
  resetUserProfessionalData,
  updateUserProfessionalData,
} from '../helpers/helpers';

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
              {item[1].inputType === 'RadioButton' &&
              item[0] === 'profession' ? (
                <RadioButton
                  options={['Owner', 'Agent', 'Buyer', 'Seller', 'Other']}
                  value={item[1].value}
                  onPress={optionSelected =>
                    updateUserProfessionalData(
                      item[0],
                      optionSelected,
                      userProfessionalData,
                      setUserProfessionalData,
                    )
                  }
                />
              ) : (
                <TextInput
                  value={item[1].value.toString()}
                  onChangeText={text =>
                    updateUserProfessionalData(
                      item[0],
                      text,
                      userProfessionalData,
                      setUserProfessionalData,
                    )
                  }
                  style={[
                    styles.textInput,
                    item[0] === 'profession' &&
                      isInputInvalid(item[1]) &&
                      styles.textInputError,
                  ]}
                />
              )}
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
