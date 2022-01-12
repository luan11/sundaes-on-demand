import P from 'prop-types';
import { Col, Form } from 'react-bootstrap';

import { BASE_URL } from '../../constants/entry';

const ToppingOptions = ({ name, imagePath, updateItemCount }) => (
  <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: `center` }}>
    <img
      style={{ width: `75%` }}
      src={`${BASE_URL}${imagePath}`}
      alt={`${name} topping`}
    />

    <Form.Check
      id={`${name}-count`}
      type="checkbox"
      label={name}
      onChange={updateItemCount}
    />
  </Col>
);

ToppingOptions.propTypes = {
  name: P.string.isRequired,
  imagePath: P.string.isRequired,
  updateItemCount: P.func.isRequired,
};

export default ToppingOptions;
