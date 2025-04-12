import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

import { Spinner } from '@frontend/components';
import { AuthorizationStatus } from '@frontend/src/const';
import { useAppSelector } from '@frontend/src/hooks';
import { userSelectors } from '@frontend/store';
import { RouteApp } from '@frontend/types/types';

type PrivateRouteProps = {
  restrictedFor: AuthorizationStatus;
  redirectTo: RouteApp;
  children: JSX.Element;
};

const PrivateRoute = ({
  children,
  restrictedFor,
  redirectTo,
}: PrivateRouteProps): JSX.Element => {
  const authorizationStatus = useAppSelector(userSelectors.authorizationStatus);
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
