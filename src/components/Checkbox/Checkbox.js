import React from 'react';

import './Checkbox.css';

function Checkbox({ className, label, name, value, onChange }) {
  return (
    <label
      className={`checkbox ${className}`}
      htmlFor={name}
    >
      <input
        className={"checkbox_field"}
        type={"checkbox"}
        id={name}
        checked={value}
        onChange={e => onChange(e.target.checked)}
      />
      <span className={"checkbox_checkmark"} />
      {label}
    </label>
  );
}

export { Checkbox };
