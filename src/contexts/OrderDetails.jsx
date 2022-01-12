import { createContext, useState, useMemo, useEffect } from 'react';

import {
  OPTION_TYPE_SCOOPS,
  OPTION_TYPE_TOPPINGS,
  PRICE_PER_ITEM,
} from '../constants/entry';

const formatCurrency = (amount) =>
  new Intl.NumberFormat(`en-US`, {
    style: `currency`,
    currency: `USD`,
    minimumFractionDigits: 2,
  }).format(amount);

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
  const zeroCurrency = formatCurrency(0);
  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal(OPTION_TYPE_SCOOPS, optionCounts);
    const scoops = formatCurrency(scoopsSubtotal);
    const toppingsSubtotal = calculateSubtotal(
      OPTION_TYPE_TOPPINGS,
      optionCounts
    );
    const toppings = formatCurrency(toppingsSubtotal);
    const grandTotal = formatCurrency(scoopsSubtotal + toppingsSubtotal);

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
