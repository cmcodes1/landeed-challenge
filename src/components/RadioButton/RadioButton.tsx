import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import {Option, Options, OnPress} from './types';

export default function RadioButton(props: {
  options: Options;
  value: Option;
  onPress: OnPress;
}): React.JSX.Element {
  const {options, value, onPress} = props;

  const [isOtherSelected, setIsOtherSelected] = useState(false);

  const handlePress = (item: Option) => {
    onPress(item);
    setIsOtherSelected(item === 'Other');
  };

  return (
    <View>
      {options.map(item => (
        <TouchableOpacity
          key={item}
          style={styles.row}
          onPress={() => handlePress(item)}>
          <View style={styles.radioButton}>
            {(value === item || (isOtherSelected && item === 'Other')) && (
              <View style={styles.radioButtonChecked} />
            )}
          </View>
          <Text>{item}</Text>
        </TouchableOpacity>
      ))}
      {isOtherSelected && (
        <TextInput
          value={value}
          onChangeText={text => onPress(text)}
          style={[styles.textInput, !value && styles.textInputError]}
        />
      )}
    </View>
  );
}
