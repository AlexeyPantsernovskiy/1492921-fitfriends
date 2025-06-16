import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@frontend/src/hooks';
import { getFriends, userSelectors } from '@frontend/store';
import { Limits } from '@frontend/const';
import {
  FilledButton,
  FriendCard,
  Spinner,
  ThumbnailNearest,
} from '@frontend/components';
import { ButtonType } from '@frontend/types/component';

import BackButton from '../../components/back-button/back-button';

function MyFriends(): JSX.Element {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(userSelectors.isLoading);
  const friends = useAppSelector(userSelectors.users);
  const [limit, setLimit] = useState<number>(Limits.MyFriends);

  useEffect(() => {
    dispatch(
      getFriends({
        limit,
      })
    );
  }, [dispatch, limit]);

  const handleButtonMoreClick = () => {
    const newLimit = limit + Limits.MyPurchases;
    setLimit(newLimit);
    dispatch(getFriends({ limit: newLimit }));
  };

  const handleButtonToTopClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <section className="friends-list">
      <div className="container">
        <div className="friends-list__wrapper">
          <BackButton className="friends-list__back" />
          <div className="friends-list__title-wrapper">
            <h1 className="friends-list__title">Мои друзья</h1>
          </div>
          {isLoading && <Spinner />}
          {(!friends || friends.entities.length === 0) && (
            <ThumbnailNearest text="Пока у Вас нет друзей" />
          )}
          {friends && friends.entities.length > 0 && (
            <ul className="friends-list__list">
              {friends.entities.map((friend) => (
                <li className="friends-list__item" key={`item-${friend.id}`}>
                  <FriendCard friend={friend} />
                </li>
              ))}
            </ul>
          )}
          <div className="show-more friends-list__show-more">
            {friends && friends.totalPages > friends.currentPage && (
              <FilledButton
                classPrefix="show-more"
                addClasses="show-more__button--more"
                type={ButtonType.Button}
                caption="Показать еще"
                onClick={handleButtonMoreClick}
              />
            )}
            {friends &&
              friends.itemsPerPage > Limits.MyPurchases &&
              friends.totalPages === friends.currentPage && (
                <FilledButton
                  classPrefix="show-more"
                  type={ButtonType.Button}
                  caption="Вернуться в начало"
                  onClick={handleButtonToTopClick}
                />
              )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyFriends;
