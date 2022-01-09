import P from 'prop-types';
import Alert from 'react-bootstrap/Alert';

const AlertBanner = ({ message, variant }) => (
  <Alert variant={variant}>{message}</Alert>
);

AlertBanner.propTypes = {
  message: P.string,
  variant: P.oneOf([
    `primary`,
    `secondary`,
    `success`,
    `danger`,
    `warning`,
    `info`,
    `light`,
    `dark`,
  ]),
};

AlertBanner.defaultProps = {
  message: `An unexpected error ocurred. Please try again later.`,
  variant: `danger`,
};

export default AlertBanner;
