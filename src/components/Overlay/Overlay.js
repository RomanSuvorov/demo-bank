import React from 'react';
import PropTypes from 'prop-types';

import './Overlay.css';

function Overlay({
  className,
  forMobileOnly,
  show,
  withBackground,
  onClick,
}) {
  let classNames = 'overlay';

  if (className) classNames += ` ${className}`;
  if (withBackground) classNames += ' withBackground';
  if (forMobileOnly) classNames += ' forMobileOnly';
  if (show) classNames += ' show';

  return (
    <div
      className={classNames}
      onClick={onClick}
    />
  )
}

Overlay.propTypes = {
  className: PropTypes.string,
  forMobileOnly: PropTypes.bool,
  show: PropTypes.bool,
  withBackground: PropTypes.bool,
  onClick: PropTypes.func,
};

Overlay.defaultProps = {
  className: '',
  forMobileOnly: false,
  show: false,
  withBackground: true,
  onClick: () => {},
};

export { Overlay };
