import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

import { Spinner } from '@frontend/components';
import { AuthorizationStatus } from '@frontend/src/const';
import { useAppSelector } from '@frontend/src/hooks';
import { userSelectors } from '@frontend/store';
import { RouteApp } from '@frontend/types/types';
import { UserRole } from '@project/shared';
import { QuestionnaireCoach, QuestionnaireUser } from '@frontend/pages';

type PrivateRouteProps = {
  children: JSX.Element;
  restrictedFor: AuthorizationStatus;
  redirectTo: RouteApp;
  redirectCoach?: RouteApp;
};

const PrivateRoute = ({
  children,
  restrictedFor,
  redirectTo,
  redirectCoach,
}: PrivateRouteProps): JSX.Element => {
  const authorizationStatus = useAppSelector(userSelectors.authorizationStatus);
  const user = useAppSelector(userSelectors.user);
  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }

  if (authorizationStatus === restrictedFor) {
    return <Navigate to={redirectTo} />;
  }
  if (user && !user.questionnaire) {
    return user.role === UserRole.Coach ? (
      <QuestionnaireCoach />
    ) : (
      <QuestionnaireUser />
    );
  }
  return user && user.role === UserRole.Coach && redirectCoach ? (
    <Navigate to={redirectCoach} />
  ) : (
    children
  );
};

export default PrivateRoute;
