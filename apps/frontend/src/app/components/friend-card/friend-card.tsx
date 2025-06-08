import { useState } from 'react';

import {
  RequestTrain,
  Specialization,
  UserRdo,
  UserRole,
} from '@project/shared';
import { useAppDispatch, useAppSelector } from '@frontend/src/hooks';
import { requestTrain, userSelectors } from '@frontend/store';
import { ButtonType } from '@frontend/types/component';

import FilledButton from '../filled-button/filled-button';

interface FriendCardProps {
  friend: UserRdo;
}

function FriendCard({ friend }: FriendCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const userAuth = useAppSelector(userSelectors.userAuth);
  const [user, setUser] = useState(friend);

  const handleButtonClick = (action: RequestTrain) => async () => {
    try {
      const updatedUser = await dispatch(
        requestTrain({ userId: user.id, action })
      ).unwrap();
      setUser(updatedUser);
    } catch (error) {
      console.error('Ошибка при изменении состояния запроса:', error);
    }
  };

  return (
    <div className="thumbnail-friend">
      <div
        className={`thumbnail-friend__info thumbnail-friend__info--theme-${user.role === UserRole.Coach ? 'dark' : 'light'}`}
      >
        <div className="thumbnail-friend__image-status">
          <div className="thumbnail-friend__image">
            <picture>
              <source type="image/webp" srcSet={user.avatar} />
              <img
                src={user.avatar}
                srcSet={user.avatar}
                width="78"
                height="78"
                alt=""
              />
            </picture>
          </div>
        </div>
        <div className="thumbnail-friend__header">
          <h2 className="thumbnail-friend__name">{user.name}</h2>
          <div className="thumbnail-friend__location">
            <svg width="14" height="16" aria-hidden="true">
              <use xlinkHref="#icon-location"></use>
            </svg>
            <address className="thumbnail-friend__location-address">
              {user.location}
            </address>
          </div>
        </div>
        <ul className="thumbnail-friend__training-types-list">
          {user.questionnaire?.specialization &&
            user.questionnaire.specialization.map((item) => (
              <li key={item}>
                <div className="hashtag thumbnail-friend__hashtag">
                  <span>#{Specialization[item]}</span>
                </div>
              </li>
            ))}
        </ul>
        <div className="thumbnail-friend__activity-bar">
          <div
            className={`thumbnail-friend__ready-status thumbnail-friend__ready-status--is${user.questionnaire?.isReadyToTrain ? '' : '-not'}-ready`}
          >
            {user.questionnaire?.isReadyToTrain && (
              <span>Готов к&nbsp;тренировке</span>
            )}
            {!user.questionnaire?.isReadyToTrain && (
              <span>Не&nbsp;готов к&nbsp;тренировке</span>
            )}
          </div>
          {!user.requestTrain && (
            <button
              className="thumbnail-friend__invite-button"
              type="button"
              onClick={handleButtonClick(RequestTrain.Send)}
            >
              <svg width="43" height="46" aria-hidden="true" focusable="false">
                <use xlinkHref="#icon-invite"></use>
              </svg>
              <span className="visually-hidden">
                Пригласить друга на совместную тренировку
              </span>
            </button>
          )}
        </div>
      </div>
      {user.requestTrain && (
        <div
          className={`thumbnail-friend__request-status thumbnail-friend__request-status--role-${user.role === UserRole.Coach ? 'coach' : 'user'}`}
        >
          <p className="thumbnail-friend__request-text">
            Запрос на&nbsp;
            {user.role === UserRole.Coach ? 'персональную ' : 'совместную '}
            тренировку
            {user.requestUserId === userAuth?.id &&
              user.requestTrain === RequestTrain.Send &&
              ' отправлен'}
            {user.requestTrain === RequestTrain.Accept && ' принят'}
            {user.requestTrain === RequestTrain.Reject && ' не принят'}
          </p>
          {user.requestUserId !== userAuth?.id &&
            user.requestTrain === RequestTrain.Send && (
              <div className="thumbnail-friend__button-wrapper">
                <FilledButton
                  classPrefix="humbnail-friend"
                  addClasses="btn--medium btn--dark-bg"
                  type={ButtonType.Button}
                  caption="Принять"
                  onClick={handleButtonClick(RequestTrain.Accept)}
                />
                <FilledButton
                  classPrefix="humbnail-friend"
                  addClasses="btn--medium btn--dark-bg"
                  type={ButtonType.Button}
                  caption="Отклонить"
                  onClick={handleButtonClick(RequestTrain.Reject)}
                />
              </div>
            )}
        </div>
      )}
    </div>
  );
}

export default FriendCard;
