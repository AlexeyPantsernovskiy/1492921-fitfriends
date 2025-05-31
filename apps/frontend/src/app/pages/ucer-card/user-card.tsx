import { MouseEvent, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@frontend/src/hooks';
import { getUser, userSelectors } from '@frontend/store';
import { BackButton, FilledButton, Spinner } from '@frontend/components';
import { ButtonType } from '@frontend/types/component';
import { Specialization } from '@project/shared';

function UserCard(): JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { id } = params;
  const isLoading = useAppSelector(userSelectors.isLoading);
  const user = useAppSelector(userSelectors.user);
  console.log('params', params);
  useEffect(() => {
    if (id) {
      dispatch(getUser(id));
    }
  }, [dispatch, id]);

  console.log('id', id);
  if (!id || isLoading) {
    return <Spinner />;
  }

  const HandleAddFriendsButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    alert('Пока не готово!');
  };

  return (
    <div className="inner-page inner-page--no-sidebar">
      <div className="container">
        <div className="inner-page__wrapper">
          <BackButton className="btn-flat inner-page__back" />
          {(isLoading || !user) && <Spinner />}
          {!isLoading && user && (
            <div className="inner-page__content">
              <section className="user-card">
                <h1 className="visually-hidden">Карточка пользователя</h1>

                <div className="user-card__wrapper">
                  <div className="user-card__content">
                    <div className="user-card__head">
                      <h2 className="user-card__title">{user.name}</h2>
                    </div>

                    <div className="user-card__label">
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

                    {user.questionnaire.isReadyToTrain && (
                      <div className="user-card__status">
                        <span>Готов к тренировке</span>
                      </div>
                    )}

                    <div className="user-card__text">
                      <p>{user.description}</p>
                    </div>

                    <ul className="user-card__hashtag-list">
                      {user.questionnaire.specialization.map((item) => (
                        <li className="user-card__hashtag-item">
                          <div className="hashtag">
                            <span>{`#${Specialization[item]}`}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <FilledButton
                      addClasses="user-card__btn"
                      type={ButtonType.Button}
                      caption="Добавить в друзья"
                      onClick={HandleAddFriendsButtonClick}
                    />
                  </div>

                  <div className="user-card__gallary">
                    <ul className="user-card__gallary-list">
                      <li className="user-card__gallary-item">
                        <img
                          src={user.photo1}
                          srcSet={user.photo1}
                          width="334"
                          height="573"
                          alt="photo1"
                        />
                      </li>
                      <li className="user-card__gallary-item">
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
