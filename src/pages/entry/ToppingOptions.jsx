import P from 'prop-types';
import { Col, Form, Row } from 'react-bootstrap';

import { BASE_URL } from '../../constants/entry';

const ToppingOptions = ({ name, imagePath, updateItemCount }) => (
  <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: `center` }}>
    <img
      style={{ width: `75%` }}
      src={`${BASE_URL}${imagePath}`}
      alt={`${name} topping`}
    />

    <Form.Group controlId={`${name}-count`} as={Row} style={{ marginTop: 10 }}>
      <Form.Label column xs={6} style={{ textAlign: `right` }}>
        {name}
      </Form.Label>
      <Col xs={5} style={{ textAlign: `left` }}>
        <Form.Control
          onChange={updateItemCount}
          type="number"
          min={0}
          defaultValue={0}
        />
      </Col>
    </Form.Group>
  </Col>
);

ToppingOptions.propTypes = {
  name: P.string.isRequired,
  imagePath: P.string.isRequired,
  updateItemCount: P.func.isRequired,
};

export default ToppingOptions;
