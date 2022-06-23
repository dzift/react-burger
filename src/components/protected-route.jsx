import React, { memo } from "react";
import { Route, Redirect } from "react-router-dom";
import { getUserData } from "../services/actions/authorization";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "./preloader/preloader";

const ProtectedRoute = ({ children, ...rest }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const { requestInProgress, user } = useSelector(
    (store) => store.AuthorizationData
  );

  return (
    <>
      {requestInProgress ? (
        <Preloader />
      ) : (
        <Route
          {...rest}
          render={({ location }) =>
            !!user.name ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: location },
                }}
              />
            )
          }
        />
      )}
    </>
  );
};
export default memo(ProtectedRoute);
