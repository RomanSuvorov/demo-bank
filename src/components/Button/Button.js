import React from 'react';

import './Button.css';

function Button({
  className,
  hidden = false,
  type = 'button',
  disabled = false,
  children,
  onClick = () => {},
}) {
  return (
    <button
      hidden={hidden}
      type={type}
      disabled={disabled}
      className={`button ${className ? className : ''}${hidden ? ' hidden' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export { Button };
