import { useContext } from 'react';

import { OrderDetails } from '../contexts/OrderDetails';

const useOrderDetails = () => {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error(
      `useOrderDetails must be used within an OrderDetailsProvider`
    );
  }

  return context;
};

export default useOrderDetails;
