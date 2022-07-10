import { FC } from "react";
import { RouteProps } from "react-router";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Preloader from "./preloader/preloader";

const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { requestInProgress, isLoggedIn } = useSelector(
    (store: any) => store.AuthorizationData
  );

  return (
    <>
      {requestInProgress ? (
        <div className={`pt-30`}>
          <Preloader />
        </div>
      ) : (
        <Route
          {...rest}
          // @ts-ignore
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
      )}
    </>
  );
};

export default ProtectedRoute;
