import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: 250,
    alignItems: 'center',
    paddingBottom: 10,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonChecked: {
    height: 10,
    width: 10,
    backgroundColor: 'grey',
    borderRadius: 5,
  },

  textInput: {
    height: 40,
    width: '65%',
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  textInputError: {
    borderColor: 'red',
  },
});
