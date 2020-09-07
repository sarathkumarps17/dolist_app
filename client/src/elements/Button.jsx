import React from "react";

function Button({ children, ...otherProps }) {
  return <button {...otherProps}>{children}</button>;
}

export default Button;
