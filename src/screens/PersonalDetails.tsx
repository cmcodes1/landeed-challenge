import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {onValue} from 'firebase/database';
import {userDetailsRef} from '../../App';

export default function PersonalDetails() {
  const [userData, setUserData] = useState({});

  const getData = () => {
    onValue(userDetailsRef, snapshot => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        setUserData(snapshot.val());
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View>
      <Text>PersonalDetails</Text>
    </View>
  );
}
