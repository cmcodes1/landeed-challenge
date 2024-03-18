import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    width: '25%',
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
