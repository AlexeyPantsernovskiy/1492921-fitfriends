import { MouseEvent, JSX, useState, useRef } from 'react';
import classNames from 'classnames';

import { currencyParser } from '@frontend/src/utils';
import { useAppDispatch, useAppSelector } from '@frontend/src/hooks';
import {
  trainingSelectors,
  updateTraining,
  userSelectors,
} from '@frontend/store';
import {
  DurationName,
  SexNameForTraining,
  Specialization,
} from '@project/shared';
import {
  FilledButton,
  FlatButton,
  InputFile,
  PopupFormBuy,
  Spinner,
} from '@frontend/components';
import {
  ButtonType,
  Icon,
  IconPosition,
  InputType,
  FileLoadingInput,
} from '@frontend/types/component';
import { DISCOUNT } from '@frontend/const';

export type HashTagProps = {
  text: string;
};

function HashTag({ text }: HashTagProps): JSX.Element {
  return (
    <li className="training-info__item">
      <div className="hashtag hashtag--white">
        <span>#{text}</span>
      </div>
    </li>
  );
}

function TrainingInfo(): JSX.Element {
  const dispatch = useAppDispatch();
  const [newVideo, setVideo] = useState<File | null | undefined>(undefined);
  const videoRef = useRef<HTMLVideoElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const training = useAppSelector(trainingSelectors.training);
  const user = useAppSelector(userSelectors.userAuth);
  const [price, setPrice] = useState(training?.price);
  const [isSpecialOffer, setIsSpecialOffer] = useState(
    training?.isSpecialOffer
  );
  const [showModal, setShowModal] = useState(false);

  if (!training || !user) {
    return <Spinner />;
  }

  const isMyTraining = user.id === training.coachId;

  const handleModalFormClose = () => {
    setShowModal(false);
  };

  const formatDisplayValue = (value: string | number) => {
    const number = currencyParser(value);
    return new Intl.NumberFormat('ru-RU').format(number);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = currencyParser(e.target.value);
    setPrice(newValue);
  };

  const handlePriceKeyDown = (e: React.KeyboardEvent) => {
    if (e.key.length !== 1 || e.ctrlKey || e.metaKey) {
      return;
    }
    if (!/[0-9,.\s]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const HandlePurchaseButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowModal(true);
  };
  const HandleStartButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    alert('Пока не готово!');
  };
  const HandleEndButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    alert('Пока не готово!');
  };

  const handleEditButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEdit(true);
  };

  const handleSaveButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formRef.current) {
      return;
    }
    const formData = new FormData();
    const formDataCurrent = new FormData(formRef.current);

    formData.append('name', formDataCurrent.get('training')?.toString() || '');
    formData.append(
      'description',
      formDataCurrent.get('description')?.toString() || ''
    );
    formData.append('price', formDataCurrent.get('price')?.toString() || '');
    formData.append('isSpecialOffer', isSpecialOffer ? 'true' : 'false');

    const trainingId = training.id.toString();
    dispatch(updateTraining({ trainingId, formData }));

    let oldSrc = '';
    if (newVideo) {
      oldSrc = URL.createObjectURL(newVideo);
      URL.revokeObjectURL(oldSrc);
    }

    setIsEdit(false);
    setVideo(undefined);

    if (priceRef.current && price) {
      priceRef.current.value = `${formatDisplayValue(price)} ₽`;
    }
    if (videoRef.current && training.video !== oldSrc) {
      videoRef.current.load();
    }
  };

  const HandleVideoSaveButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (!newVideo) {
      return;
    }
    const formData = new FormData();
    formData.append('videoFile', newVideo);
    const trainingId = training.id.toString();
    dispatch(updateTraining({ trainingId, formData }));
    setVideo(undefined);
  };

  const HandleVideoDeleteButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setVideo(null);
  };

  const handleIsSpecialOfferClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setIsSpecialOffer(!isSpecialOffer);
    if (price) {
      const newPrice = isSpecialOffer
        ? Math.round(price * (1 - DISCOUNT))
        : Math.round(price / (1 - DISCOUNT));
      setPrice(newPrice);
      if (priceRef.current && price) {
        priceRef.current.value = `${formatDisplayValue(newPrice)} ₽`;
      }
    }
  };

  if (showModal && training) {
    return <PopupFormBuy onClose={handleModalFormClose} training={training} />;
  }

  return (
    <div
      className={classNames('training-card', { 'training-card--edit': isEdit })}
    >
      <div className="training-info">
        <h2 className="visually-hidden">Информация о тренировке</h2>
        <div className="training-info__header">
          <div className="training-info__coach">
            <div className="training-info__photo">
              <picture>
                <img
                  src={training.coach.avatar}
                  width="64"
                  height="64"
                  alt="Изображение тренера"
                />
              </picture>
            </div>

            <div className="training-info__coach-info">
              <span className="training-info__label">Тренер</span>
              <span className="training-info__name">{training.coach.name}</span>
            </div>
          </div>
          {isMyTraining && (
            <FlatButton
              className={`btn-flat--light training-info__edit training-info__edit--${isEdit ? 'save' : 'edit'}`}
              caption={isEdit ? 'Сохранить' : 'Редактировать'}
              icon={Icon.Edit}
              isUnderline
              onClick={isEdit ? handleSaveButtonClick : handleEditButtonClick}
            />
          )}
        </div>
        <div className="training-info__main-content">
          <form action="#" method="get" ref={formRef}>
            <div className="training-info__form-wrapper">
              <div className="training-info__info-wrapper">
                <div className="training-info__input training-info__input--training">
                  <label>
                    <span className="training-info__label">
                      Название тренировки
                    </span>
                    <input
                      type="text"
                      name="training"
                      defaultValue={training.name}
                      disabled={!isEdit}
                    />
                  </label>
                  <div className="training-info__error">Обязательное поле</div>
                </div>
                <div className="training-info__textarea">
                  <label>
                    <span className="training-info__label">
                      Описание тренировки
                    </span>
                    <textarea
                      name="description"
                      disabled={!isEdit}
                      defaultValue={training.description}
                    />
                  </label>
                </div>
              </div>
              <div className="training-info__rating-wrapper">
                <div className="training-info__input training-info__input--rating">
                  <label>
                    <span className="training-info__label">Рейтинг</span>
                    <span className="training-info__rating-icon">
                      <svg width="18" height="18" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </span>
                    <input
                      type="number"
                      name="rating"
                      defaultValue={Math.round(training.rating)}
                      disabled
                    />
                  </label>
                </div>
                <ul className="training-info__list">
                  <HashTag text={Specialization[training.specialization]} />
                  <HashTag text={SexNameForTraining[training.sex]} />
                  <HashTag text={`${training.calories}ккал`} />
                  <HashTag text={DurationName[training.duration]} />
                </ul>
              </div>
              <div className="training-info__price-wrapper">
                <div className="training-info__input training-info__input--price">
                  <label>
                    <span className="training-info__label">Стоимость</span>
                    <input
                      ref={priceRef}
                      type={InputType.Text}
                      name="price"
                      defaultValue={`${formatDisplayValue(training.price)} ₽`}
                      disabled={!isEdit}
                      onChange={handlePriceChange}
                      onKeyDown={handlePriceKeyDown}
                    />
                  </label>
                  <div className="training-info__error">Введите число</div>
                </div>
                {isMyTraining && isEdit && (
                  <FlatButton
                    className="btn-flat--light training-info__discount"
                    icon={isSpecialOffer ? Icon.DiscountUndo : Icon.Discount}
                    isUnderline={isEdit}
                    iconPosition={IconPosition.Left}
                    onClick={handleIsSpecialOfferClick}
                  />
                )}
                {isMyTraining && !isEdit && training.isSpecialOffer && (
                  <span
                    style={{ color: 'white' }}
                  >{`Предоставлена скидка ${DISCOUNT * 100} %`}</span>
                )}
                {!isMyTraining && (
                  <FilledButton
                    caption="Купить"
                    type={ButtonType.Button}
                    addClasses="training-info__buy"
                    onClick={HandlePurchaseButtonClick}
                  />
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="training-video">
        <h2 className="training-video__title">Видео</h2>

        {newVideo !== null && (
          <div className="training-video__video">
            <div className="training-video__player">
              <video
                ref={videoRef}
                controls
                width="100%"
                height="auto"
                className="training-video__video-element"
              >
                <source
                  src={
                    newVideo ? URL.createObjectURL(newVideo) : training.video
                  }
                  type="video/mp4"
                />
                Ваш браузер не поддерживает видео
              </video>
            </div>
          </div>
        )}
        {newVideo === null && (
          <div
            className="training-video__drop-files"
            style={{
              display: 'flex',
              paddingTop: '180px',
              paddingBottom: '180px',
            }}
          >
            <form action="#" method="post">
              <div className="training-video__form-wrapper">
                <InputFile
                  fileType={FileLoadingInput.Video}
                  onChange={setVideo}
                />
              </div>
            </form>
          </div>
        )}
        <div className="training-video__buttons-wrapper">
          {isMyTraining && (
            <div className="training-video__edit-buttons">
              <FilledButton
                caption="Сохранить"
                addClasses="training-video__button--start"
                type={ButtonType.Button}
                disabled={!newVideo}
                onClick={HandleVideoSaveButtonClick}
              />
              <FilledButton
                caption="Удалить"
                addClasses="btn--outlined"
                type={ButtonType.Button}
                disabled={newVideo === null}
                onClick={HandleVideoDeleteButtonClick}
              />
            </div>
          )}
          {!isMyTraining && (
            <>
              <FilledButton
                caption="Приступить"
                classPrefix="training-video"
                addClasses="training-video__button--start"
                type={ButtonType.Button}
                disabled
                onClick={HandleStartButtonClick}
              />
              <FilledButton
                caption="Закончить"
                classPrefix="training-video"
                addClasses="training-video__button--stop"
                type={ButtonType.Button}
                disabled
                onClick={HandleEndButtonClick}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrainingInfo;
