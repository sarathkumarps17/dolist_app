import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Landingpage from "./components/LandingPage";
import Navbar from "./layouts/Navbar";
import Home from "./components/homePage/Home";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./layouts/Alert";
import setAuthToken from "./utils/setAuthToken";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import Footer from "./layouts/Footer";

// Redux
import { store } from "./redux/store/store";
import { Provider } from "react-redux";
import { loadUser } from "./redux/actios/auth";
import "./App.css";
import "./sass/main.scss";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        {" "}
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landingpage} />
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/login" component={Login}></Route>
            <ProtectedRoute exact path="/home" component={Home} />
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
