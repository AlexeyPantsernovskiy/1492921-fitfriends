import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@frontend/src/hooks';
import {
  addFriend,
  deleteFriend,
  getTrainings,
  getUser,
  requestTrain,
  trainingSelectors,
  userSelectors,
} from '@frontend/store';
import {
  BackButton,
  CustomToggle,
  FilledButton,
  FlatButton,
  Hashtags,
  IconButton,
  Spinner,
  ThumbnailNearest,
  TrainingCard,
} from '@frontend/components';
import { ButtonType, Icon, IconPosition } from '@frontend/types/component';
import {
  RequestTrain,
  Specialization,
  UserRole,
  UserRoleInfo,
} from '@project/shared';
import classNames from 'classnames';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Limits } from '@frontend/const';
import { Navigation } from 'swiper/modules';

function UserCard(): JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { id } = params;
  const isLoading = useAppSelector(userSelectors.isLoading);
  const user = useAppSelector(userSelectors.user);
  const cardClassName = `user-card${user?.role === UserRole.Coach ? `-coach${user?.questionnaire.isReadyToTrain ? '' : '-2'}` : ''}`;

  const isLoadingTrainings = useAppSelector(
    trainingSelectors.isTrainingCatalogLoading
  );
  const trainingCatalog = useAppSelector(trainingSelectors.trainingCatalog);
  const trainings = trainingCatalog?.entities;
  const [isRequestTrain, setIsRequestTrain] = useState(false);

  const sliderRef = useRef<SwiperRef>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (id) {
      dispatch(getUser(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getTrainings({ coachId: id }));
  }, [dispatch, id]);

  useEffect(() => {
    setIsRequestTrain(Boolean(user?.requestTrain));
  }, [user?.requestTrain]);

  const handleUpdateFriendsButtonClick = async (
    e: MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    if (!user) {
      return;
    }
    if (user.isFriend) {
      await dispatch(deleteFriend(user.id));
    } else {
      await dispatch(addFriend(user.id));
    }
  };

  const handleRequestTrainingButtonClick = async (
    e: MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    if (!id) {
      return;
    }
    try {
      await dispatch(
        requestTrain({ userId: id, action: RequestTrain.Send })
      ).unwrap();
      setIsRequestTrain(true);
    } catch (error) {
      console.error('Ошибка при изменении состояния запроса:', error);
    }
  };

  const handleToggleClick = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    alert('Пока не готов');
  };

  const status = user ? (
    <div
      className={classNames(`${cardClassName}__status`, {
        [`${cardClassName}__status--check`]: user?.role === UserRole.Coach,
      })}
    >
      <span>
        {user?.questionnaire.isReadyToTrain
          ? UserRoleInfo[user.role].readyCaption
          : UserRoleInfo[user.role].notReadyCaption}
      </span>
    </div>
  ) : (
    <></>
  );

  const card = user ? (
    <>
      <div className={`${cardClassName}__content`}>
        <div className={`${cardClassName}__head`}>
          <h2 className={`${cardClassName}__title`}>{user.name}</h2>
        </div>

        <div className={`${cardClassName}__label`}>
          <Link to="">
            <svg
              className="user-card-coach__icon-location"
              width="12"
              height="14"
              aria-hidden="true"
            >
              <use xlinkHref="#icon-location"></use>
            </svg>
            <span>{user.location}</span>
          </Link>
        </div>
        {user.role === UserRole.Coach ? (
          <div className={`${cardClassName}__status-container`}>
            <div
              className={`${cardClassName}__status ${cardClassName}__status--tag`}
            >
              <svg
                className={`${cardClassName}__icon-cup`}
                width="12"
                height="13"
                aria-hidden="true"
              >
                <use xlinkHref="#icon-cup"></use>
              </svg>
              <span>Тренер</span>
            </div>
            {status}
          </div>
        ) : (
          status
        )}
        <div className={`${cardClassName}__text`}>
          <p>{user.description}</p>
        </div>
        {user.role === UserRole.Coach && (
          <FlatButton
            icon={Icon.ViewCertificate}
            className={`${cardClassName}__sertificate`}
            iconPosition={IconPosition.Left}
          />
        )}
        <Hashtags
          tags={user.questionnaire.specialization}
          dictionary={Specialization}
          listClassName={`${cardClassName}__hashtag-list`}
          itemClassName={`${cardClassName}__hashtag-item`}
        />
        <FilledButton
          addClasses={`${cardClassName}__btn`}
          type={ButtonType.Button}
          caption={user.isFriend ? 'Удалить из друзей' : 'Добавить в друзья'}
          onClick={handleUpdateFriendsButtonClick}
        />
      </div>
      <div className={`${cardClassName}__gallary`}>
        <ul className={`${cardClassName}__gallary-list`}>
          <li className={`${cardClassName}__gallary-item`}>
            <img
              src={user.photo1}
              srcSet={user.photo1}
              width="334"
              height="573"
              alt="photo1"
            />
          </li>
          <li className={`${cardClassName}__gallary-item`}>
            <img
              src={user.photo2}
              srcSet={user.photo2}
              width="334"
              height="573"
              alt="photo2"
            />
          </li>
        </ul>
      </div>
    </>
  ) : (
    <></>
  );

  return (
    <div className="inner-page inner-page--no-sidebar">
      <div className="container">
        <div className="inner-page__wrapper">
          <BackButton className="btn-flat inner-page__back" />
          {(isLoading || !user) && <Spinner />}
          {!isLoading && user && (
            <div className="inner-page__content">
              <section className={cardClassName}>
                <h1 className="visually-hidden">{`Карточка пользователя${user.role === UserRole.Coach ? ' роль тренер' : ''}`}</h1>
                <div className={`${cardClassName}__wrapper`}>
                  {user.role === UserRole.Coach ? (
                    <>
                      <div className={`${cardClassName}__card`}>{card}</div>
                      <div className="user-card-coach__training">
                        <div className="user-card-coach__training-head">
                          <h2 className="user-card-coach__training-title">
                            Тренировки
                          </h2>
                          <div className="user-card-coach__training-bts">
                            <IconButton
                              classNames="btn-icon user-card-coach__training-btn"
                              icon={Icon.Prev}
                              ref={prevButtonRef}
                              onClick={() =>
                                sliderRef.current?.swiper.slidePrev()
                              }
                            />
                            <IconButton
                              classNames="btn-icon user-card-coach__training-btn"
                              icon={Icon.Next}
                              ref={nextButtonRef}
                              onClick={() =>
                                sliderRef.current?.swiper.slideNext()
                              }
                            />
                          </div>
                        </div>

                        {isLoadingTrainings || !trainings ? (
                          <Spinner />
                        ) : trainings.length === 0 ? (
                          <ThumbnailNearest />
                        ) : (
                          <Swiper
                            slidesPerView={Limits.SliderTrainings}
                            className="user-card-coach__training-list"
                            modules={[Navigation]}
                            ref={sliderRef}
                            onBeforeInit={(swiper) => {
                              if (prevButtonRef.current) {
                                swiper.navigation.prevEl =
                                  prevButtonRef.current;
                              }
                              if (nextButtonRef.current) {
                                swiper.navigation.nextEl =
                                  nextButtonRef.current;
                              }
                            }}
                          >
                            {trainings.map((training) => (
                              <SwiperSlide
                                key={`SwiperSlide-${training.id}`}
                                className="user-card-coach__training-item"
                              >
                                <TrainingCard training={training} />
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        )}

                        <form className="user-card-coach__training-form">
                          {!isRequestTrain && (
                            <FilledButton
                              addClasses="user-card-coach__btn-training"
                              type={ButtonType.Button}
                              caption="Хочу персональную тренировку"
                              disabled={!user.isFriend}
                              onClick={handleRequestTrainingButtonClick}
                            />
                          )}

                          <div className="user-card-coach__training-check">
                            <CustomToggle
                              name="user-agreement"
                              value="user-agreement-1"
                              caption="Получать уведомление на почту о новой тренировке"
                              onChange={handleToggleClick}
                            />
                          </div>
                        </form>
                      </div>
                    </>
                  ) : (
                    card
                  )}
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserCard;
