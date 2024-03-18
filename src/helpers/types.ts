type InputField = {
  inputType: 'TextInput' | 'RadioButton';
  validation: RegExp | string;
  value: string | number;
};

export type {InputField};
