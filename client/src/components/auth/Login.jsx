import React, { useState } from "react";
import Input from "../../elements/Input";
import Button from "../../elements/Button";
import { login } from "../../redux/actios/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
const Login = ({ login, isAuthenticated }) => {
  const initialState = {
    name: "",
    password: "",
  };
  const [input, setInput] = useState(initialState);

  const handleChange = (event) => {
    let { name, value } = event.target;
    setInput((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    login({ ...input });
  };
  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }
  return (
    <div className="container">
      <div className="login">
        <div className="login-container">
          <h1>LogIn !</h1>
          <span className="login-note">
            If you have an account please Log in
          </span>
          <form className="login-form" onSubmit={handleSubmit}>
            <Input
              placeholder="Name"
              className="login-form-name"
              name="name"
              type="text"
              handleChange={handleChange}
              value={input.name}
              required
            />
            <Input
              placeholder="Password"
              className="login-form-password"
              name="password"
              type="password"
              handleChange={handleChange}
              value={input.password}
              required
            />
            <div className="login-container-btn-box">
              <Button
                className="login-container-btn login-container-btn-dark"
                children="Log In"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
