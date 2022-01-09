import P from 'prop-types';
import Col from 'react-bootstrap/Col';

import { BASE_URL } from '../../constants/entry';

const ToppingOptions = ({ name, imagePath }) => (
  <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: `center` }}>
    <img
      style={{ width: `75%` }}
      src={`${BASE_URL}${imagePath}`}
      alt={`${name} topping`}
    />
  </Col>
);

ToppingOptions.propTypes = {
  name: P.string.isRequired,
  imagePath: P.string.isRequired,
};

export default ToppingOptions;
