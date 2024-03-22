import {TextInput} from 'react-native';
import React from 'react';
import RadioButton from '../RadioButton/RadioButton';
import {isInputInvalid} from '../../helpers/helpers';
import {styles} from './styles';
import {InputProps} from './types';

export default function Input(props: InputProps): React.JSX.Element {
  const {inputFieldName, inputField, onPress} = props;

  const options =
    inputFieldName === 'gender'
      ? ['M', 'F', 'Nonbinary']
      : ['Owner', 'Agent', 'Buyer', 'Seller', 'Other'];

  return (
    <>
      {inputField.inputType === 'RadioButton' &&
      (inputFieldName === 'gender' || inputFieldName === 'profession') ? (
        <RadioButton
          options={options}
          value={inputField.value.toString()}
          onPress={onPress}
        />
      ) : (
        <TextInput
          value={inputField.value.toString()}
          onChangeText={onPress}
          style={[
            styles.textInput,
            !(inputFieldName === 'what services do you need?') &&
              isInputInvalid(inputField) &&
              styles.textInputError,
          ]}
          keyboardType={inputFieldName === 'age' ? 'numeric' : 'default'}
        />
      )}
    </>
  );
}
