import P from 'prop-types';
import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';

import api from '../../services/api';
import {
  OPTIONS_TYPES_AS_COMPONENT,
  PRICE_PER_ITEM,
} from '../../constants/entry';
import AlertBanner from '../common/AlertBanner';
import useOrderDetails from '../../hooks/useOrderDetails';

const Options = ({ optionType }) => {
  const [orderDetails, updateItemCount] = useOrderDetails();
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getOptions = async () => {
      try {
        const { data } = await api.get(`/${optionType}`);

        setItems(data);
      } catch (error) {
        setError(true);
      }
    };

    getOptions();
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent = OPTIONS_TYPES_AS_COMPONENT[optionType] ?? null;
  const title = optionType.charAt(0).toUpperCase() + optionType.slice(1);

  const handleUpdateItemCount = (itemName) => (event) =>
    updateItemCount(itemName, event.target.value, optionType);

  const optionItems = items.map(({ name, imagePath }) => (
    <ItemComponent
      key={name}
      name={name}
      imagePath={imagePath}
      updateItemCount={handleUpdateItemCount}
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{PRICE_PER_ITEM[optionType]} each</p>
      <p>{`${title} total: ${orderDetails.totals[optionType]}`}</p>
      <Row>{optionItems}</Row>
    </>
  );
};

Options.propTypes = {
  optionType: P.string.isRequired,
};

export default Options;
