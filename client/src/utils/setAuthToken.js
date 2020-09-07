import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x_auth_token"] = token;
  } else {
    delete axios.defaults.headers.common["x_auth_token"];
  }
};
export default setAuthToken;
