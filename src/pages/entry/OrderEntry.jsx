import Options from './Options';

import {
  OPTION_TYPE_SCOOPS,
  OPTION_TYPE_TOPPINGS,
} from '../../constants/entry';

const OrderEntry = () => (
  <>
    <Options optionType={OPTION_TYPE_SCOOPS} />
    <Options optionType={OPTION_TYPE_TOPPINGS} />
  </>
);

export default OrderEntry;
