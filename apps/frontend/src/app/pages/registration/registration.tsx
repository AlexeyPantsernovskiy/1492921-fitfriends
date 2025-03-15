import { FormEvent, JSX, /*useEffect, useRef,*/ useState } from 'react';

import { useAppDispatch } from '@frontend/src/hooks';
import { registerUser } from '@frontend/src/store/user-slice/user-action';
import {
  LOCATIONS,
  PREFIX_LOCATION,
  Sex,
  SEX,
  UserRegister,
  UserRole,
} from '@project/shared-core';

import {
  Avatar,
  Button,
  Checkbox,
  Input,
  Logo,
  Select,
  SelectRadio,
} from '@frontend/components';
import { AppRoute, InputField } from '@frontend/src/const';
import historyBrowser from '@frontend/src/history';

const Registration = (): JSX.Element => {
  const dispatch = useAppDispatch();
  //const [isNameValid, setIsNameValid] = useState<boolean>(false);
  // const uploadRef = useRef<HTMLInputElement>(null);
  // const imgRef = useRef<HTMLImageElement>(null);

  // const onImageAddButtonClick = () => {
  //   uploadRef.current?.click();
  // };

  // useEffect(() => {
  //   if (product?.photo) {
  //     if (imgRef.current) {
  //       imgRef.current.srcset = product.photo;
  //     }
  //   }
  // }, [product, dispatch]);

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
                    <Avatar photo={selectedPhoto} onChange={setSelectedPhoto} />
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
                    <Input {...InputField.Name} />
                    <Input {...InputField.Email} />
                    <Input {...InputField.Birthday} />
                    <Select
                      items={LOCATIONS}
                      caption="Ваша локация"
                      value={location}
                      prefixCaption={PREFIX_LOCATION}
                      onSelect={setLocation}
                    />
                    <Input {...InputField.Password} />
                    <SelectRadio
                      classPrefix="sign-up"
                      name="sex"
                      items={SEX}
                      caption="Пол"
                    />
                  </div>
                  <div className="sign-up__role">
                    <h2 className="sign-up__legend">Выберите роль</h2>
                    <div className="role-selector sign-up__role-selector">
                      {Object.values(UserRole).map((role) => (
                        <div className="role-btn">
                          <label>
                            <input
                              className="visually-hidden"
                              type="radio"
                              name="role"
                              value={role.code}
                              defaultChecked={role.isDefault}
                              disabled={role.isDisabled}
                            />
                            <span className="role-btn__icon">
                              <svg width="12" height="13" aria-hidden="true">
                                <use xlinkHref="#icon-cup"></use>
                              </svg>
                            </span>
                            <span className="role-btn__btn">
                              {role.caption}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Checkbox
                    classPrefix="sign-up"
                    name="user-agreement"
                    caption={
                      <>
                        'Я соглашаюсь с{' '}
                        <span>политикой конфиденциальности</span> компании'
                      </>
                    }
                    value="user-agreement"
                    isChecked
                  />
                  <Button classPrefix="sign-up" />
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
