import React, { Fragment } from "react";

function Input({ handleChange, className, label, ...otherProps }) {
  return (
    <Fragment>
      <input className={className} onChange={handleChange} {...otherProps} />
      {label ? <label className={`${className}-label`}>{label}</label> : null}
    </Fragment>
  );
}

export default Input;
