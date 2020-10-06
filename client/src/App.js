import React, { useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import PrivateRoute from "./hocs/PrivateRoute";
import UnPrivateRoute from "./hocs/UnPrivateRoute";
import "antd/dist/antd.css";
function App() {
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(
    AuthContext
  );

  console.log(user, isAuthenticated);
  return (
    <Router>
      <PrivateRoute exact path="/" component={Home} roles={["user", "admin"]} />
      <UnPrivateRoute exact path="/login" component={Login} />
      <UnPrivateRoute exact path="/register" component={Register} />
    </Router>
  );
}

export default App;
