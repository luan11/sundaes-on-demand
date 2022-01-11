import { createContext, useState, useMemo, useEffect } from 'react';

import {
  OPTION_TYPE_SCOOPS,
  OPTION_TYPE_TOPPINGS,
  PRICE_PER_ITEM,
} from '../constants/entry';

export const OrderDetails = createContext();

const calculateSubtotal = (optionType, optionCounts) => {
  const optionCount =
    optionCounts[optionType].size > 0
      ? Array.from(optionCounts[optionType].values()).reduce(
          (prevValue, currentValue) => prevValue + currentValue
        )
      : 0;

  return optionCount * PRICE_PER_ITEM[optionType];
};

export const OrderDetailsProvider = ({ children, ...props }) => {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });
  const [totals, setTotals] = useState({
    scoops: 0,
    toppings: 0,
    grandTotal: 0,
  });

  useEffect(() => {
    const scoops = calculateSubtotal(OPTION_TYPE_SCOOPS, optionCounts);
    const toppings = calculateSubtotal(OPTION_TYPE_TOPPINGS, optionCounts);
    const grandTotal = scoops + toppings;

    setTotals({ scoops, toppings, grandTotal });
  }, [optionCounts]);

  const value = useMemo(() => {
    const updateItemCount = (itemName, newItemCount, optionType) => {
      const newOptionCounts = { ...optionCounts };

      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, +newItemCount);

      setOptionCounts(newOptionCounts);
    };

    return [{ ...optionCounts, totals }, updateItemCount];
  }, [optionCounts, totals]);

  return (
    <OrderDetails.Provider value={value} {...props}>
      {children}
    </OrderDetails.Provider>
  );
};
