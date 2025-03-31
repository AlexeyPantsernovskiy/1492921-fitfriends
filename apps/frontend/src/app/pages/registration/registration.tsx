import { FormEvent, JSX, useState } from 'react';

import { useAppDispatch } from '@frontend/src/hooks';
import { registerUser } from '@frontend/src/store/user-slice/user-action';
import { LOCATIONS, PREFIX_LOCATION, Sex, UserRoleInfo } from '@project/shared';
import {
  Avatar,
  FilledButton,
  CheckboxIcon,
  CustomInput,
  Logo,
  CustomSelect,
  ToggleRadio,
} from '@frontend/components';
import { FormField } from '@frontend/types/component';

const Registration = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [location, setLocation] = useState('');

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (selectedPhoto) {
      formData.append('avatarFile', selectedPhoto);
    }
    formData.set('location', location);
    dispatch(registerUser(formData));
  };

  return (
    <>
      <Logo />
      <div className="popup-form popup-form--sign-up">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__title-wrapper">
              <h1 className="popup-form__title">Регистрация</h1>
            </div>
            <div className="popup-form__form">
              <form method="get" onSubmit={handleFormSubmit}>
                <div className="sign-up">
                  <div className="sign-up__load-photo">
                    <Avatar
                      photo={
                        selectedPhoto
                          ? URL.createObjectURL(selectedPhoto)
                          : undefined
                      }
                      onChange={setSelectedPhoto}
                    />
                    <div className="sign-up__description">
                      <h2 className="sign-up__legend">
                        Загрузите фото профиля
                      </h2>
                      <span className="sign-up__text">
                        JPG, PNG, оптимальный размер 100×100 px
                      </span>
                    </div>
                  </div>
                  <div className="sign-up__data">
                    <CustomInput {...FormField.Name} />
                    <CustomInput {...FormField.Email} />
                    <CustomInput {...FormField.Birthday} />
                    <CustomSelect
                      items={LOCATIONS}
                      caption="Ваша локация"
                      value={location}
                      prefixCaption={PREFIX_LOCATION}
                      onSelect={setLocation}
                    />
                    <CustomInput {...FormField.Password} />
                    <ToggleRadio
                      {...FormField.Sex}
                      classPrefix="sign-up"
                      items={Sex}
                    />
                  </div>
                  <div className="sign-up__role">
                    <h2 className="sign-up__legend">Выберите роль</h2>
                    <div className="role-selector sign-up__role-selector">
                      {Object.entries(UserRoleInfo).map(([key, value]) => (
                        <div className="role-btn">
                          <label>
                            <input
                              className="visually-hidden"
                              type="radio"
                              name="role"
                              value={key}
                              defaultChecked={value.isDefault}
                              disabled={value.isDisabled}
                            />
                            <span className="role-btn__icon">
                              <svg width="12" height="13" aria-hidden="true">
                                <use xlinkHref="#icon-cup"></use>
                              </svg>
                            </span>
                            <span className="role-btn__btn">
                              {value.caption}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <CheckboxIcon
                    classPrefix="sign-up"
                    name="user-agreement"
                    caption={
                      <>
                        Я соглашаюсь с <span>политикой конфиденциальности</span>{' '}
                        компании
                      </>
                    }
                    value="user-agreement"
                    checked
                  />
                  <FilledButton classPrefix="sign-up" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
