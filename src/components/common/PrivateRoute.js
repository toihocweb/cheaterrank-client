import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiUrl } from "../../utils/api";
import Axios from "axios";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const currentUser = useSelector((state) => state.authReducer.currentUser);

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser?.role === "admin" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
