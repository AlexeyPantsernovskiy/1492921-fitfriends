import { JSX } from 'react';
import {
  unstable_HistoryRouter as HistoryRouter,
  Route,
  Routes,
} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import {
  PrivateRoute,
  TrainingCatalogFilter,
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
  MyOrders,
  NotFound,
  PersonalAccount,
  QuestionnaireCoach,
  QuestionnaireUser,
  Registration,
  TrainingCard,
  TrainingCatalog,
} from '@frontend/src/pages';
import CreateTraining from '@frontend/src/pages/create-training/create-training';
import MyTrainingFilter from '../my-training-filter/my-training-filter';

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
                <TrainingCatalog
                  caption="Каталог тренировок"
                  classPrefixForm="gym-catalog-form"
                  classPrefixCatalog="training-catalog"
                  formFilter={TrainingCatalogFilter}
                />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.MyTraining}
            element={
              <PrivateRoute
                restrictedFor={AuthorizationStatus.NoAuth}
                redirectTo={AppRoute.Root}
              >
                <TrainingCatalog
                  caption="Мои тренировки"
                  classPrefixForm="my-training-form"
                  classPrefixCatalog="my-trainings"
                  isDivInnerPageContent
                  formFilter={MyTrainingFilter}
                />
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
          <Route
            path={AppRoute.CreateTraining}
            element={
              <PrivateRoute
                restrictedFor={AuthorizationStatus.NoAuth}
                redirectTo={AppRoute.Root}
              >
                <CreateTraining />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.MyOrders}
            element={
              <PrivateRoute
                restrictedFor={AuthorizationStatus.NoAuth}
                redirectTo={AppRoute.Root}
              >
                <MyOrders />
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
