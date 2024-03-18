import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    width: '25%',
  },
  textInput: {
    height: 40,
    width: '75%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  textInputError: {
    borderColor: 'red',
  },
});
