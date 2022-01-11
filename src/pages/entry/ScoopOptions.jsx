import P from 'prop-types';
import Col from 'react-bootstrap/Col';

import { BASE_URL } from '../../constants/entry';

const ScoopOptions = ({ name, imagePath, updateItemCount }) => (
  <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: `center` }}>
    <img
      style={{ width: `75%` }}
      src={`${BASE_URL}${imagePath}`}
      alt={`${name} scoop`}
    />
  </Col>
);

ScoopOptions.propTypes = {
  name: P.string.isRequired,
  imagePath: P.string.isRequired,
  updateItemCount: P.func.isRequired,
};

export default ScoopOptions;
