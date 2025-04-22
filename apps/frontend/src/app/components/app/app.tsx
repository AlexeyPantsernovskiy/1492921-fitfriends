import { JSX } from 'react';
import {
  unstable_HistoryRouter as HistoryRouter,
  Route,
  Routes,
} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import {
  PrivateRoute,
  Wrapper,
  WrapperHeaderMain,
  WrapperMain,
} from '@frontend/components';
import { AppRoute, AuthorizationStatus } from '@frontend/src/const';
import historyBrowser from '@frontend/src/history';
import {
  Friends,
  Intro,
  Login,
  Main,
  NotFound,
  PersonalAccount,
  QuestionnaireCoach,
  QuestionnaireUser,
  Registration,
  TrainingCard,
  TrainingCatalog,
} from '@frontend/src/pages';

const App = (): JSX.Element => (
  <HistoryRouter history={historyBrowser}>
    <Routes>
      <Route element={<Wrapper />}>
        <Route element={<WrapperMain />}>
          <Route
            path={AppRoute.Intro}
            element={
              <PrivateRoute
                restrictedFor={AuthorizationStatus.Auth}
                redirectTo={AppRoute.Root}
              >
                <Intro />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Login}
            element={
              <PrivateRoute
                restrictedFor={AuthorizationStatus.Auth}
                redirectTo={AppRoute.Root}
              >
                <Login />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Register}
            element={
              <PrivateRoute
                restrictedFor={AuthorizationStatus.Auth}
                redirectTo={AppRoute.Root}
              >
                <Registration />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.QuestionnaireUser}
            element={
              <PrivateRoute
                restrictedFor={AuthorizationStatus.NoAuth}
                redirectTo={AppRoute.Intro}
              >
                <QuestionnaireUser />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.QuestionnaireCoach}
            element={
              <PrivateRoute
                restrictedFor={AuthorizationStatus.NoAuth}
                redirectTo={AppRoute.Intro}
              >
                <QuestionnaireCoach />
              </PrivateRoute>
            }
          />
        </Route>
        <Route element={<WrapperHeaderMain />}>
          <Route
            index
            element={
              <PrivateRoute
                restrictedFor={AuthorizationStatus.NoAuth}
                redirectTo={AppRoute.Intro}
                redirectCoach={AppRoute.PersonalAccount}
              >
                <Main />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Friends}
            element={
              <PrivateRoute
                restrictedFor={AuthorizationStatus.NoAuth}
                redirectTo={AppRoute.Root}
              >
                <Friends />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Main}
            element={
              <PrivateRoute
                restrictedFor={AuthorizationStatus.NoAuth}
                redirectTo={AppRoute.Intro}
                redirectCoach={AppRoute.PersonalAccount}
              >
                <Main />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.PersonalAccount}
            element={
              <PrivateRoute
                restrictedFor={AuthorizationStatus.NoAuth}
                redirectTo={AppRoute.Intro}
              >
                <PersonalAccount />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Catalog}
            element={
              <PrivateRoute
                restrictedFor={AuthorizationStatus.NoAuth}
                redirectTo={AppRoute.Root}
                redirectCoach={AppRoute.PersonalAccount}
              >
                <TrainingCatalog />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.TrainingCard}
            element={
              <PrivateRoute
                restrictedFor={AuthorizationStatus.NoAuth}
                redirectTo={AppRoute.Root}
              >
                <TrainingCard />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </HistoryRouter>
);

export default App;
