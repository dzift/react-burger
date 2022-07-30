import { FC } from "react";
import { RouteProps } from "react-router";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "../utils/hooks";
import Preloader from "./preloader/preloader";

const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { requestInProgress, isLoggedIn } = useSelector(
    (store) => store.AuthorizationData
  );
  if (requestInProgress) {
    <div className={`pt-30`}>
      <Preloader />
    </div>;
  }
  return (
    <Route
      {...rest}
      // @ts-ignore не могу понять в чем проблема render, буду благодарен если укажешь на ошибку.
      render={({ location }) =>
        isLoggedIn ? (
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
  );
};

export default ProtectedRoute;
