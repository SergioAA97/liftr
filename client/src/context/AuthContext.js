import { Row, Col } from "antd";
import React, { createContext, useState, useEffect } from "react";
import Spinner from "../components/utils/Spinner";
import AuthService from "../service/AuthService";

export const AuthContext = createContext();

export default ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AuthService.isAuthenticated().then((data) => {
      setUser(data.user);
      setIsAuthenticated(data.isAuthenticated);
      setIsLoaded(true);
    });
  }, []);

  return (
    <div>
      {!isLoaded ? (
        <Row
          justify="center"
          align="middle"
          className="text-center"
          style={{ height: "100vh" }}
        >
          <Col xs={24} md={8} xl={4}>
            <Spinner />
          </Col>
        </Row>
      ) : (
        <AuthContext.Provider
          value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  );
};
