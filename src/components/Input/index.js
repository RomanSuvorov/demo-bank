import React from 'react';

import './index.css';

export function Input({
  className,
  label,
  name,
  type = "text",
  value,
  error,
  placeholder,
  onChange,
  Icon,
  iconHandler,
  readOnly = false,
  loading = false,
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
      <div className={`input_field__container ${loading ? 'load' : ''}`}>
        {
          type === 'textarea' ? (
            <textarea
              className={`input_field ${error ? 'input_field__error' : ''} ${Icon ? 'withIcon' : ''}`}
              id={name}
              value={value ? value : ''}
              placeholder={placeholder}
              readOnly={readOnly || loading}
              onChange={e => onChange(e.target.value)}
              {...props}
            />
          ) : (
            <input
              className={`input_field ${error ? 'input_field__error' : ''} ${Icon ? 'withIcon' : ''}`}
              id={name}
              value={value ? value : ''}
              placeholder={placeholder}
              type={type}
              readOnly={readOnly || loading}
              onChange={e => onChange(e.target.value)}
              {...props}
            />
          )
        }
      </div>

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
