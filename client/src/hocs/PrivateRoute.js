import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import DiaryProvider from "../context/DiaryContext";

const PrivateRoute = ({
  component: Component,
  roles,
  diaryContext = null,
  ...rest
}) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated)
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );

        if (!roles.includes(user.role))
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );

        if (diaryContext) {
          return (
            <DiaryProvider>
              <Component {...props} />
            </DiaryProvider>
          );
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
