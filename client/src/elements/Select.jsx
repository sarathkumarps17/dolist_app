import React from "react";

function Select({ options, label, name, onChange, value, className }) {
  return (
    <div className={className}>
      {label ? <label className={`${className}-label`}>{label}</label> : null}
      <select
        className={`${className}-select`}
        onChange={onChange}
        value={value}
        name={name}
      >
        {options.map((item) => (
          <option
            id="option"
            className={`${className}-select-option`}
            key={item.id}
            value={item.value}
          >
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
