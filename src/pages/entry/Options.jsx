import P from 'prop-types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';

import ScoopOptions from './ScoopOptions';

const OPTION_TYPE_SCOOPS = `scoops`;

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getOptions = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3030/${optionType}`);

        setItems(data);
      } catch (error) {
        // TODO: Handle error
      }
    };

    getOptions();
  }, [optionType]);

  const ItemComponent = optionType === OPTION_TYPE_SCOOPS ? ScoopOptions : null;

  const optionItems = items.map(({ name, imagePath }) => (
    <ItemComponent key={name} name={name} imagePath={imagePath} />
  ));

  return <Row>{optionItems}</Row>;
};

Options.propTypes = {
  optionType: P.string.isRequired,
};

export default Options;
