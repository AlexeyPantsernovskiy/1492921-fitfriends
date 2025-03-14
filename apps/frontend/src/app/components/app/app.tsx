import { JSX } from 'react';
import {
  unstable_HistoryRouter as HistoryRouter,
  Route,
  Routes,
} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import { PrivateRoute } from '@frontend/components';
import { AppRoute, AuthorizationStatus } from '@frontend/src/const';
import historyBrowser from '@frontend/src/history';
import { Intro, Login, Main, Registration } from '@frontend/pages';
import QuestionnaireUser from '@frontend/src/pages/questionnaire/questionnaire-user';

const App = (): JSX.Element => (
  <HistoryRouter history={historyBrowser}>
    <Routes>
      <Route element={<Main />}>
        <Route
          index
          element={
            <PrivateRoute
              restrictedFor={AuthorizationStatus.Auth}
              redirectTo={AppRoute.Catalog}
            >
              <Intro />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Root}
          element={
            <PrivateRoute
              restrictedFor={AuthorizationStatus.Auth}
              redirectTo={AppRoute.Catalog}
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
              redirectTo={AppRoute.Catalog}
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
              redirectTo={AppRoute.Catalog}
            >
              <Registration />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Questionnaire}
          element={
            <PrivateRoute
              restrictedFor={AuthorizationStatus.Auth}
              redirectTo={AppRoute.Root}
            >
              <QuestionnaireUser />
            </PrivateRoute>
          }
        />
        {/* <Route
          path={AppRoute.Catalog}
          element={
            <PrivateRoute
              restrictedFor={AuthorizationStatus.NoAuth}
              redirectTo={AppRoute.Root}
            >
              <ProductList />
            </PrivateRoute>
          }
        /> */}
        {/* <Route
          path={AppRoute.Account}
          element={
            <PrivateRoute
              restrictedFor={AuthorizationStatus.NoAuth}
              redirectTo={AppRoute.Root}
            >
              <AddProduct />
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
              <EditProduct />
            </PrivateRoute>
          }
        /> */}
        <Route path="*" element={<Intro />} />
      </Route>
    </Routes>
  </HistoryRouter>
);

export default App;
