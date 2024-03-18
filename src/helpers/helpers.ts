import {InputField} from './types';

const isInputInvalid = (input: InputField) => {
  const isInvalid: boolean = !new RegExp(input.validation, 'i').test(
    input.value.toString(),
  );

  return isInvalid;
};

export {isInputInvalid};
