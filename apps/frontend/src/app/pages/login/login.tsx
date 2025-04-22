import { FormEvent, JSX } from 'react';

import { FilledButton, CustomInput, Logo } from '@frontend/components';
import { useAppDispatch } from '@frontend/src/hooks';
import { loginUser } from '@frontend/src/store/user-slice/user-action';
import { UserLogin, UserRole } from '@project/shared';
import { FormField } from '@frontend/types/component';
import { AppRoute } from '@frontend/const';
import history from '@frontend/src/history';

const Login = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: UserLogin = {
      email: formData.get('email')?.toString() || '',
      password: formData.get('password')?.toString() || '',
    };
    try {
      const user = await dispatch(loginUser(data)).unwrap();
      if (user.questionnaire) {
        if (user.role === UserRole.Sportsman) {
          history.push(AppRoute.Main);
        } else {
          history.push(AppRoute.PersonalAccount);
        }
      } else {
        if (user.role === UserRole.Sportsman) {
          history.push(AppRoute.QuestionnaireUser);
        } else {
          history.push(AppRoute.QuestionnaireCoach);
        }
      }
    } catch (error) {
      throw new Error(`Ошибка при авторизации: ${error}`);
    }
  };

  return (
    <>
      <Logo />
      <div className="popup-form popup-form--sign-in">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__title-wrapper">
              <h1 className="popup-form__title">Вход</h1>
            </div>
            <div className="popup-form__form">
              <form method="get" onSubmit={handleFormSubmit}>
                <div className="sign-in">
                  <CustomInput {...FormField.Email} classPrefix="sign-in" />
                  <CustomInput {...FormField.Password} classPrefix="sign-in" />
                  <FilledButton classPrefix="sign-in" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
