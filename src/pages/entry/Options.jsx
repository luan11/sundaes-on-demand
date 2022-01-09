import P from 'prop-types';
import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';

import api from '../../services/api';
import { OPTIONS_TYPES_AS_COMPONENT } from '../../constants/entry';

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getOptions = async () => {
      try {
        const { data } = await api.get(`/${optionType}`);

        setItems(data);
      } catch (error) {
        // TODO: Handle error
      }
    };

    getOptions();
  }, [optionType]);

  const ItemComponent = OPTIONS_TYPES_AS_COMPONENT[optionType] ?? null;

  const optionItems = items.map(({ name, imagePath }) => (
    <ItemComponent key={name} name={name} imagePath={imagePath} />
  ));

  return <Row>{optionItems}</Row>;
};

Options.propTypes = {
  optionType: P.string.isRequired,
};

export default Options;
