import {View, Text, Button, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from '../styles/styles';
import {
  getUserPersonalData,
  goToNextPage,
  resetUserPersonalData,
  updateUserPersonalData,
} from '../helpers/helpers';
import Input from '../components/Input/Input';
import {InputField, UserPersonalDataInputFields} from '../helpers/types';
import {PersonalDetailsProps} from './types';

export default function PersonalDetails({
  navigation,
  route,
}: PersonalDetailsProps): React.JSX.Element {
  const [userPersonalData, setUserPersonalData] = useState({});

  useEffect(() => {
    getUserPersonalData(setUserPersonalData);
  }, []);

  useEffect(() => {
    route?.params?.resetData &&
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
              <Input
                inputFieldName={item[0] as UserPersonalDataInputFields}
                inputField={item[1] as InputField}
                onPress={text =>
                  updateUserPersonalData(
                    item[0] as UserPersonalDataInputFields,
                    text,
                    userPersonalData,
                    setUserPersonalData,
                  )
                }
              />
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
