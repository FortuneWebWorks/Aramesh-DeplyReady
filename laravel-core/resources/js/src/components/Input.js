import React from 'react';

const Input = ({
  title,
  value,
  onChange,
  className,
  type,
  disabled,
  min,
  max,
  placeholder,
  onFocus,
  onBlur,
}) => {
  return (
    <div
      className={`input-container ${className || ''}`}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <label htmlFor="input">{title}</label>
      <input
        id="input"
        className="input"
        type={type}
        value={value}
        disabled={disabled}
        min={min}
        max={max}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
