import React from 'react';

import './Input.css';

function Input({ className, type, value, onChange }) {
  return (
    <div className={`input ${className}`}>
      <input value={value} type={type} className="input_field" onChange={onChange} />
    </div>
  )
}

export { Input };
