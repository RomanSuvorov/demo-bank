import React from 'react';

import './Input.css';

function Input({
  className,
  label,
  name,
  type,
  value,
  error,
  placeholder,
  onChange,
  Icon,
  iconHandler,
  readOnly = false,
  ...props
}) {
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
        className={`input_field ${error ? 'input_field__error' : ''} ${Icon ? 'withIcon' : ''}`}
        id={name}
        value={value ? value : ''}
        placeholder={placeholder}
        type={type}
        readOnly={readOnly}
        onChange={e => onChange(e.target.value)}
        {...props}
      />
      {
        Icon && (
          <div className={`input_icon ${label ? 'withLabel' : ''}`} onClick={iconHandler}>
            <Icon />
          </div>
        )
      }
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
