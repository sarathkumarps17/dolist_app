import React, { useState } from "react";
import Input from "../../elements/Input";
import Button from "../../elements/Button";
import { register } from "../../redux/actios/auth";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Redirect } from "react-router-dom";

const Register = ({ register, isAuthenticated }) => {
  const initialState = {
    name: "",
    password: "",
    passcode: "",
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (event) => {
    let { name, value } = event.target;
    setFormData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    register({
      ...formData,
    });
  };

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="container">
      <div className="register">
        <div className="register-container">
          <h1>Register</h1>
          <span className="register-note">
            If you don't have an account please Register
          </span>
          <form className="register-form" onSubmit={handleSubmit}>
            <Input
              placeholder="Name"
              className="register-form-name"
              name="name"
              type="text"
              handleChange={handleChange}
              value={formData.name}
              required
            />
            <Input
              placeholder="Password"
              className="register-form-password"
              name="password"
              type="password"
              handleChange={handleChange}
              value={formData.password}
              required
            />
            <Input
              placeholder="Passcode"
              className="register-form-passcode"
              name="passcode"
              type="password"
              handleChange={handleChange}
              value={formData.passcode}
              required
            />
            <div className="register-container-btn-box">
              <Button
                className="register-container-btn register-container-btn-dark"
                children="Register"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
