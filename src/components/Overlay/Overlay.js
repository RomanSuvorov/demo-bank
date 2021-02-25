import React from 'react';

import './Overlay.css';

function Overlay({
  className,
  forMobileOnly = false,
  show = false,
  withBackground = true,
  children,
  onClick = () => {},
}) {
  let classNames = 'overlay';

  if (className) classNames += ` ${className || ''}`;
  if (withBackground) classNames += ' withBackground';
  if (forMobileOnly) classNames += ' forMobileOnly';
  if (show) classNames += ' show';

  return (
    <div
      className={classNames}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export { Overlay };
