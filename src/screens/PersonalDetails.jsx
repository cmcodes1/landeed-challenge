import {View, Text, TextInput, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import {onValue, ref} from 'firebase/database';
import {database} from '../../App';
import {styles} from '../styles/styles';
import RadioButton from '../components/RadioButton/RadioButton';

export default function PersonalDetails({navigation, route}) {
  const [userPersonalData, setUserPersonalData] = useState({});

  const getUserPersonalData = () => {
    const userPersonalDetailsRef = ref(
      database,
      'userDetails/personalDetails/',
    );

    onValue(userPersonalDetailsRef, snapshot => {
      if (snapshot.exists()) {
        console.log('personalDetails', snapshot.val());
        setUserPersonalData(snapshot.val());
      }
    });
  };

  const updateUserPersonalData = (field, text) => {
    const userPersonalDataCopy = {...userPersonalData};
    userPersonalDataCopy[field].value = text;
    setUserPersonalData(userPersonalDataCopy);
  };

  const resetUserPersonalData = () => {
    const userPersonalDataCopy = {...userPersonalData};
    for (const key in userPersonalDataCopy) {
      userPersonalDataCopy[key].value = '';
    }
    setUserPersonalData(userPersonalDataCopy);
  };

  useEffect(() => {
    getUserPersonalData();
  }, []);

  useEffect(() => {
    route.params?.resetData && resetUserPersonalData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params?.resetData]);

  return (
    <View style={styles.root}>
      {Object.entries(userPersonalData).map(item => (
        <View key={item[0]} style={styles.row}>
          <Text style={styles.label}>{item[0]}</Text>
          {item[1].inputType === 'RadioButton' && item[0] === 'gender' ? (
            <RadioButton
              options={['M', 'F', 'Nonbinary']}
              value={item[1].value}
              onPress={optionSelected =>
                updateUserPersonalData(item[0], optionSelected)
              }
            />
          ) : (
            <TextInput
              value={item[1].value.toString()}
              onChangeText={text => updateUserPersonalData(item[0], text)}
              style={[styles.textInput]}
            />
          )}
        </View>
      ))}
      <Button
        title="Next Page"
        onPress={() =>
          navigation.navigate('ProfessionalDetails', {
            userPersonalData: userPersonalData,
          })
        }
      />
    </View>
  );
}
