type Option =
  | string
  | 'M'
  | 'F'
  | 'Nonbinary'
  | 'Owner'
  | 'Agent'
  | 'Buyer'
  | 'Seller'
  | 'Other';

type Options = Option[];

type OnPress = (item: Option) => void;

type RadioButtonProps = {
  options: Options;
  value: Option;
  onPress: OnPress;
};

export type {RadioButtonProps, Option};
