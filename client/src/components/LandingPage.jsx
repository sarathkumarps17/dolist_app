import React from "react";
import Button from "../elements/Button";
import { useHistory } from "react-router-dom";

const LandingPage = () => {
  const history = useHistory();

  const routeChange = () => {
    let path = `/login`;
    history.push(path);
  };

  return (
    <div className="landing-page">
      <div className="landing-page-container">
        <h1 className="landing-page-header">Dolist App</h1>
        <p className="landing-page-note">Welcome To DoList App </p>
        <Button
          className="landing-page-btn landing-page-btn-white"
          children="LOGIN"
          onClick={routeChange}
        />
      </div>
    </div>
  );
};

export default LandingPage;
