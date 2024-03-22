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
              <Input
                inputFieldName={item[0]}
                inputField={item[1]}
                onPress={text =>
                  updateUserPersonalData(
                    item[0],
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
