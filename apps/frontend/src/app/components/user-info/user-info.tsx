import { useState } from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '@frontend/src/hooks';
import {
  EMPTY_VALUE,
  Level,
  LevelName,
  LOCATIONS,
  PREFIX_LOCATION,
  Sex,
  SexName,
  Specialization,
  User,
  UserLimit,
  UserRoleInfo,
} from '@project/shared';
import {
  IconButton,
  Spinner,
  Avatar,
  CustomSelect,
  FlatButton,
  CustomInput,
  ChecklistButton,
  CustomTextarea,
} from '@frontend/components';
import { logoutUser, updateUser, userSelectors } from '@frontend/store';
import {
  Icon,
  FormField,
  ButtonType,
  SpinnerText,
} from '@frontend/types/component';
import history from '@frontend/src/history';
import { AppRoute } from '@frontend/const';

type UserInfoProps = {
  user: User;
};

function UserInfo({ user }: UserInfoProps): JSX.Element {
  const dispatch = useAppDispatch();

  const saving = useAppSelector(userSelectors.saving);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<File | null | undefined>(
    undefined
  );
  const [specialization, setSpecialization] = useState<Specialization[]>(
    user.questionnaire?.specialization ?? []
  );
  const [location, setLocation] = useState(user.location);
  const [sex, setSex] = useState(user.sex);
  const [level, setLevel] = useState(user.questionnaire?.level);

  const getClassName = (element?: string, elementName?: string): string =>
    `user-info${isEdit ? '-edit' : ''}${element ? `__${element}` : ''} ${elementName ? `user-info__${element}--${elementName}` : ''}`;

  const handleEditButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEdit(true);
  };

  const handleExitButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(logoutUser());
    setIsEdit(false);
    history.push(AppRoute.Intro);
  };

  const handleDeleteButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSelectedPhoto(null);
  };

  const handleRefreshButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const avatarElement =
      document.querySelector<HTMLInputElement>('[id="avatar"]');
    avatarElement?.click();
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      specialization.length < UserLimit.Specialization.MinCount ||
      specialization.length > UserLimit.Specialization.MaxCount
    ) {
      const specializationFields = e.currentTarget.querySelector(
        '[name="specialization"]'
      ) as HTMLInputElement;
      specializationFields.setCustomValidity(
        `Необходимо выбрать от ${UserLimit.Specialization.MinCount} до ${UserLimit.Specialization.MaxCount} типов тренировок`
      );
      specializationFields.reportValidity();
      return;
    }

    const formData = new FormData(e.currentTarget);
    if (selectedPhoto) {
      formData.append('avatarFile', selectedPhoto);
    }
    if (selectedPhoto === null) {
      formData.append('avatar', EMPTY_VALUE);
    }
    formData.delete('specialization');
    specialization.forEach((item) => {
      formData.append('specialization', item);
    });
    formData.set(
      'isReadyToTrain',
      formData.get('ready-for-training')?.toString() === 'on' ? 'true' : 'false'
    );
    formData.set('location', location);
    formData.set('sex', sex);
    formData.set('level', level as string);
    dispatch(updateUser(formData));
    setIsEdit(false);
  };

  if (!user) {
    return <Spinner />;
  }
  if (saving) {
    return <Spinner text={SpinnerText.Saving} />;
  }

  return (
    <section className={getClassName()}>
      <div className={getClassName('header')}>
        <Avatar
          photo={
            selectedPhoto
              ? URL.createObjectURL(selectedPhoto)
              : selectedPhoto === undefined
                ? user.avatar
                : ''
          }
          disabled={!isEdit}
          onChange={setSelectedPhoto}
        />
        <div className={getClassName('controls')}>
          {isEdit && (
            <>
              <IconButton
                classNames={getClassName('control-btn')}
                icon={Icon.RefreshPhoto}
                onClick={handleRefreshButtonClick}
              />
              <IconButton
                classNames={getClassName('control-btn')}
                icon={Icon.DeletePhoto}
                onClick={handleDeleteButtonClick}
              />
            </>
          )}
          <IconButton
            classNames="user-info-edit__control-btn"
            icon={Icon.Exit}
            onClick={handleExitButtonClick}
          />
        </div>
      </div>
      <form
        className="user-info__form"
        action="./"
        method="post"
        onSubmit={handleFormSubmit}
      >
        <FlatButton
          className={`user-info__${isEdit ? 'save' : 'edit'}-button`}
          caption={isEdit ? 'Сохранить' : 'Редактировать'}
          type={isEdit ? ButtonType.Submit : ButtonType.Button}
          icon={Icon.Edit}
          isUnderline
          {...(!isEdit ? { onClick: handleEditButtonClick } : {})}
        />
        <div className={getClassName('section')}>
          <h2 className={getClassName('title')}>Обо мне</h2>
          <CustomInput
            {...FormField.Name}
            value={user.name}
            disabled={!isEdit}
            classPrefix={'user-info'}
          />
          <CustomTextarea
            {...FormField.Description}
            value={user.description}
            disabled={!isEdit}
            classPrefix={'user-info'}
          />
        </div>
        <div className={getClassName('section', 'status')}>
          <h2 className={getClassName('title', 'status')}>Статус</h2>
          <div
            className={classNames(
              'custom-toggle',
              'custom-toggle--switch',
              getClassName('toggle')
            )}
          >
            <label>
              <input
                type="checkbox"
                name="ready-for-training"
                disabled={!isEdit}
                defaultChecked={user.questionnaire?.isReadyToTrain}
              />
              <span className="custom-toggle__icon">
                <svg width="9" height="6" aria-hidden="true">
                  <use xlinkHref="#arrow-check"></use>
                </svg>
              </span>
              <span className="custom-toggle__label">
                {UserRoleInfo[user.role].readyCaption}
              </span>
            </label>
          </div>
        </div>
        <div className={getClassName('section')}>
          <h2 className={getClassName('title', 'specialization')}>
            Специализация
          </h2>
          <ChecklistButton
            classPrefix="user-info"
            name="specialization"
            items={Specialization}
            value={specialization}
            disabled={!isEdit}
            onChange={setSpecialization}
          />
        </div>
        <CustomSelect
          items={LOCATIONS}
          caption="Локация"
          value={location}
          prefixCaption={PREFIX_LOCATION}
          disabled={!isEdit}
          addClassNames="user-info"
          onSelect={setLocation}
        />
        <CustomSelect
          items={SexName}
          caption="Пол"
          value={sex}
          disabled={!isEdit}
          addClassNames="user-info"
          onSelect={(value) => setSex(value as Sex)}
        />
        <CustomSelect
          items={LevelName}
          caption="Уровень"
          value={level as string}
          disabled={!isEdit}
          addClassNames="user-info"
          onSelect={(value) => setLevel(value as Level)}
        />
      </form>
    </section>
  );
}

export default UserInfo;
