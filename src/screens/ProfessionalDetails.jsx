import {View, Text, TextInput, Button} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {database} from '../../App';
import {styles} from '../styles/styles';
import {onValue, ref, set} from 'firebase/database';

export default function ProfessionalDetails({navigation, route}) {
  const [userProfessionalData, setUserProfessionalData] = useState({});

  const getUserProfessionalData = () => {
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
        resetUserProfessionalData();
        navigation.navigate('PersonalDetails', {resetData: true});
      }, formTimeout);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [navigation],
  );

  const updateUserProfessionalData = (field, text) => {
    const userProfessionalDataCopy = {...userProfessionalData};
    userProfessionalDataCopy[field].value = text;
    setUserProfessionalData(userProfessionalDataCopy);
  };

  const resetUserProfessionalData = () => {
    const userProfessionalDataCopy = {...userProfessionalData};
    for (const key in userProfessionalDataCopy) {
      userProfessionalDataCopy[key].value = '';
    }
    setUserProfessionalData(userProfessionalDataCopy);
  };

  const handleSubmit = () => {
    const personalDetails = route.params.userPersonalData;
    const professionalDetails = userProfessionalData;
    const userDetails = {personalDetails, professionalDetails};

    const userDetailsRef = ref(database, 'userDetails/');
    set(userDetailsRef, userDetails);
  };

  useEffect(() => {
    getUserProfessionalData();
    getFormTimeout();
  }, [getFormTimeout]);

  return (
    <View style={styles.root}>
      {Object.entries(userProfessionalData).map(item => (
        <View key={item[0]} style={styles.row}>
          <Text style={styles.label}>{item[0]}</Text>
          <TextInput
            value={item[1].value.toString()}
            onChangeText={text => updateUserProfessionalData(item[0], text)}
            style={[styles.textInput]}
          />
        </View>
      ))}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}
