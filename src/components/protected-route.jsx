import { memo } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Preloader from "./preloader/preloader";

const ProtectedRoute = ({ children, ...rest }) => {
  const { requestInProgress, isLoggedIn } = useSelector(
    (store) => store.AuthorizationData
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
export default memo(ProtectedRoute);
