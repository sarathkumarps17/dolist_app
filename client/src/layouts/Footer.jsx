import React from "react";

const Footer = () => {
  let date = new Date().getFullYear();
  return (
    <div className="footer-box">
      <p className="footer">© CyberDome {date}</p>
    </div>
  );
};

export default Footer;
