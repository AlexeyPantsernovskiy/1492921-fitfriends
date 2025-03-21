import { userSelectors } from '@frontend/store';
import { useAppSelector } from '@frontend/src/hooks';
import history from '@frontend/src/history';
import {
  FutureBlock,
  PersonalAccountUser,
  Spinner,
  UserInfo,
} from '@frontend/components';
import { UserRole } from '@project/shared';

function PersonalAccount(): JSX.Element {
  const user = useAppSelector(userSelectors.user);
  if (!user) {
    return <Spinner />;
  }

  if (!user.questionnaire) {
    alert(`У пользователя ${user.name} не найден заполненный опросник.`);
    history.back();
    return <></>;
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
              <FutureBlock />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PersonalAccount;
