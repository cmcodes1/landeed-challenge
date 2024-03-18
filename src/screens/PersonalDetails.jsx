import {View, Text, TextInput, Button, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from '../styles/styles';
import RadioButton from '../components/RadioButton/RadioButton';
import {
  getUserPersonalData,
  goToNextPage,
  isInputInvalid,
  resetUserPersonalData,
  updateUserPersonalData,
} from '../helpers/helpers';

export default function PersonalDetails({navigation, route}) {
  const [userPersonalData, setUserPersonalData] = useState({});

  useEffect(() => {
    getUserPersonalData(setUserPersonalData);
  }, []);

  useEffect(() => {
    route.params?.resetData &&
      resetUserPersonalData(userPersonalData, setUserPersonalData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params?.resetData]);

  return (
    <View style={styles.root}>
      {Object.keys(userPersonalData).length === 0 ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <>
          {Object.entries(userPersonalData).map(item => (
            <View key={item[0]} style={styles.row}>
              <Text style={styles.label}>{item[0]}</Text>
              {item[1].inputType === 'RadioButton' && item[0] === 'gender' ? (
                <RadioButton
                  options={['M', 'F', 'Nonbinary']}
                  value={item[1].value}
                  onPress={optionSelected =>
                    updateUserPersonalData(
                      item[0],
                      optionSelected,
                      userPersonalData,
                      setUserPersonalData,
                    )
                  }
                />
              ) : (
                <TextInput
                  value={item[1].value.toString()}
                  onChangeText={text =>
                    updateUserPersonalData(
                      item[0],
                      text,
                      userPersonalData,
                      setUserPersonalData,
                    )
                  }
                  style={[
                    styles.textInput,
                    isInputInvalid(item[1]) && styles.textInputError,
                  ]}
                  keyboardType={item[0] === 'age' ? 'numeric' : 'default'}
                />
              )}
            </View>
          ))}
          <Button
            title="Next Page"
            onPress={() => goToNextPage(userPersonalData, navigation)}
          />
        </>
      )}
    </View>
  );
}
