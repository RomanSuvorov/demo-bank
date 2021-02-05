import React from 'react';

import './Input.css';

function Input({ className, label, name, type, value, error, placeholder, onChange, ...props }) {
  return (
    <div className={`input ${className}`}>
      {
        label && (
          <label
            className={"input_label"}
            htmlFor={name}
          >
            {label}
          </label>
        )
      }
      <input
        className={`input_field ${error ? 'input_field__error' : ''}`}
        id={name}
        value={value ? value : ''}
        placeholder={placeholder}
        type={type}
        onChange={e => onChange(e.target.value)}
        {...props}
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
