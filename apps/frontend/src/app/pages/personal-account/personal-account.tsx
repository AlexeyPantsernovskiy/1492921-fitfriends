import { userSelectors } from '@frontend/store';
import { useAppSelector } from '@frontend/src/hooks';
import history from '@frontend/src/history';
import { PersonalAccountUser, Spinner, UserInfo } from '@frontend/components';
import { UserRole } from '@project/shared';
import PersonalAccountCoach from '@frontend/src/components/personal-account-coach/personal-account-coach';

function PersonalAccount(): JSX.Element {
  const user = useAppSelector(userSelectors.user);
  if (!user) {
    return <Spinner />;
  }

  return (
    <section className="inner-page">
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Личный кабинет</h1>
          <UserInfo user={user} />
          <div className="inner-page__content">
            {user.role === UserRole.Sportsman && user.questionnaire ? (
              <PersonalAccountUser
                caloriesWaste={user.questionnaire?.caloriesWaste}
              />
            ) : (
              <PersonalAccountCoach />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PersonalAccount;
