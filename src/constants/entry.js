import ScoopOptions from '../pages/entry/ScoopOptions';
import ToppingOptions from '../pages/entry/ToppingOptions';

export const OPTION_TYPE_SCOOPS = `scoops`;
export const OPTION_TYPE_TOPPINGS = `toppings`;

export const OPTIONS_TYPES_AS_COMPONENT = {
  [OPTION_TYPE_SCOOPS]: ScoopOptions,
  [OPTION_TYPE_TOPPINGS]: ToppingOptions,
};

export const BASE_URL = `http://localhost:3030`;

export const PRICE_PER_ITEM = {
  scoops: 2,
  toppings: 1.5,
};

export const INPUT_TYPE_CHECKBOX = `checkbox`;
