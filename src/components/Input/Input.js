import React from 'react';

import './Input.css';

function Input({ className, type, value, error, placeholder, onChange }) {
  return (
    <div className={`input ${className}`}>
      <input
        className={`input_field ${error ? 'input_field__error' : ''}`}
        value={value ? value : ''}
        placeholder={placeholder}
        type={type}
        onChange={e => onChange(e.target.value)}
      />
      {
        error && (
          <div className={"input_error"}>
            <span className={"input_error__text"}>
              {`* ${error}`}
            </span>
          </div>
        )
      }
    </div>
  )
}

export { Input };
