import React from 'react';

import './Button.css';

function Button({ className, disabled, children, onClick }) {
  return (
    <button
      disabled={disabled}
      className={`button ${className ? className : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export { Button };
