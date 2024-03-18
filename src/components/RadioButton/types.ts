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

type OnPress = (item: Option) => {};

export type {Option, Options, OnPress};
