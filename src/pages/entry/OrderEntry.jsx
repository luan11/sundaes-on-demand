import Options from './Options';

import {
  OPTION_TYPE_SCOOPS,
  OPTION_TYPE_TOPPINGS,
} from '../../constants/entry';
import useOrderDetails from '../../hooks/useOrderDetails';

const OrderEntry = () => {
  const [orderDetails] = useOrderDetails();

  return (
    <>
      <Options optionType={OPTION_TYPE_SCOOPS} />
      <Options optionType={OPTION_TYPE_TOPPINGS} />
      <h2>Grand Total: {orderDetails.totals.grandTotal}</h2>
    </>
  );
};

export default OrderEntry;
