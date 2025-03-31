import { MouseEvent, JSX, useState, useRef } from 'react';

import { useAppSelector } from '@frontend/src/hooks';
import { trainingSelectors } from '@frontend/store';
import { Duration, SexNameForTraining, Specialization } from '@project/shared';
import { FilledButton, Spinner } from '@frontend/components';
import { ButtonType } from '@frontend/types/component';

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
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const training = useAppSelector(trainingSelectors.training);
  if (!training) {
    return <Spinner />;
  }
  const HandleClickPurchaseButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    alert('Пока не готово!');
  };
  const HandleClickStartButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    alert('Пока не готово!');
  };
  const HandleClickEndButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    alert('Пока не готово!');
  };

  const handlePlayClick = () => {
    setIsPlaying(true);
    // Если используете HTML5 video, можно запустить так:
    videoRef.current?.play();
  };

  const handleCloseVideo = () => {
    setIsPlaying(false);
    videoRef.current?.pause();
    videoRef.current!.currentTime = 0;
  };

  return (
    <div className="training-card">
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
        </div>
        <div className="training-info__main-content">
          <form action="#" method="get">
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
                      disabled
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
                      disabled
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
                  <HashTag text={Duration[training.duration]} />
                </ul>
              </div>
              <div className="training-info__price-wrapper">
                <div className="training-info__input training-info__input--price">
                  <label>
                    <span className="training-info__label">Стоимость</span>
                    <input
                      type="text"
                      name="price"
                      defaultValue={`${training.price || 0} ₽`}
                      disabled
                    />
                  </label>
                  <div className="training-info__error">Введите число</div>
                </div>
                <FilledButton
                  caption="Купить"
                  type={ButtonType.Button}
                  addClasses="training-info__buy"
                  onClick={HandleClickPurchaseButton}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="training-video">
        <h2 className="training-video__title">Видео</h2>
        <div className="training-video__video">
          {isPlaying ? (
            <div className="training-video__player">
              <video
                ref={videoRef}
                controls
                width="100%"
                height="auto"
                className="training-video__video-element"
              >
                <source src={training.video} type="video/mp4" />
                Ваш браузер не поддерживает видео
              </video>
              <button
                className="training-video__close-button btn-reset"
                onClick={handleCloseVideo}
              >
                <svg width="24" height="24" aria-hidden="true">
                  <use xlinkHref="#icon-close"></use>
                </svg>
              </button>
            </div>
          ) : (
            <>
              <div className="training-video__thumbnail">
                <picture>
                  <source
                    type="image/webp"
                    srcSet="/img/content/training-video/video-thumbnail.webp, /img/content/training-video/video-thumbnail@2x.webp 2x"
                  />
                  <img
                    src="/img/content/training-video/video-thumbnail.png"
                    srcSet="/img/content/training-video/video-thumbnail@2x.png 2x"
                    width="922"
                    height="566"
                    alt="Обложка видео"
                  />
                </picture>
              </div>
              <button
                className="training-video__play-button btn-reset"
                onClick={handlePlayClick}
              >
                <svg width="18" height="30" aria-hidden="true">
                  <use xlinkHref="#icon-arrow"></use>
                </svg>
              </button>
            </>
          )}
        </div>
        <div className="training-video__buttons-wrapper">
          <FilledButton
            caption="Приступить"
            classPrefix="training-video"
            addClasses="training-video__button--start"
            type={ButtonType.Button}
            disabled
            onClick={HandleClickStartButton}
          />
          <FilledButton
            caption="Закончить"
            classPrefix="training-video"
            addClasses="training-video__button--stop"
            type={ButtonType.Button}
            disabled
            onClick={HandleClickEndButton}
          />
        </div>
      </div>
    </div>
  );
}

export default TrainingInfo;
