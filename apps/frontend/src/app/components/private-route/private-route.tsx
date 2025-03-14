import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

import { Spinner } from '@frontend/components';
import { AppRoute, AuthorizationStatus } from '@frontend/src/const';
import { useAppSelector } from '@frontend/src/hooks';
import { userSelectors } from '@frontend/store';

type PrivateRouteProps = {
  restrictedFor: AuthorizationStatus;
  redirectTo: AppRoute;
  children: JSX.Element;
};

const PrivateRoute = ({
  children,
  restrictedFor,
  redirectTo,
}: PrivateRouteProps): JSX.Element => {
  const authorizationStatus = useAppSelector(userSelectors.authorizationStatus);
  console.log('AuthorizationStatus.Auth', AuthorizationStatus.Auth);
  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }

  return authorizationStatus !== restrictedFor ? (
    children
  ) : (
    <Navigate to={redirectTo} />
  );
};

export default PrivateRoute;
