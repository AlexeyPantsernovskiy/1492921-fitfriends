import { useEffect, useState } from 'react';

import {
  BackButton,
  FilledButton,
  Spinner,
  ThumbnailNearest,
  UserCatalogFilter,
  UserThumbnail,
} from '@frontend/components';
import { Limits } from '@frontend/const';
import { useAppDispatch, useAppSelector } from '@frontend/src/hooks';
import { getUsers, userSelectors } from '@frontend/store';
import { ButtonType } from '@frontend/types/component';
import { UserCatalogQuery, UserRole } from '@project/shared';

function UserCatalog(): JSX.Element {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(userSelectors.isLoading);
  const users = useAppSelector(userSelectors.users);
  const [filterParam, setFilterParam] = useState<UserCatalogQuery>({});
  const [limit, setLimit] = useState<number>(Limits.Catalog);

  // Загрузка данных при изменении фильтров
  useEffect(() => {
    // Сбрасываем лимит при изменении фильтров
    setLimit(Limits.Catalog);
    dispatch(getUsers({ ...filterParam, limit: Limits.Catalog }));
  }, [dispatch, filterParam]);

  const handleButtonMoreClick = () => {
    const newLimit = limit + Limits.Catalog;
    setLimit(newLimit);
    dispatch(getUsers({ ...filterParam, limit: newLimit }));
  };

  const handleButtonToTopClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <section className="inner-page">
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Каталог пользователей</h1>
          <div className="user-catalog-form">
            <h2 className="visually-hidden">Каталог пользователя</h2>
            <div className="user-catalog-form__wrapper">
              <BackButton className="btn-flat--underlined user-catalog-form__btnback" />
              <h3 className="user-catalog-form__title">Фильтры</h3>
              <UserCatalogFilter handleFilterApply={setFilterParam} />
            </div>
          </div>
          <div className="inner-page__content">
            <div className="training-catalog">
              {isLoading && <Spinner />}
              {!isLoading && users?.totalItems === 0 && (
                <ThumbnailNearest text="По заданным условиям ни чего не найдено" />
              )}
              {!isLoading && users && users.totalItems > 0 && (
                <>
                  <ul className="users-catalog__list">
                    {users.entities.map((user) => (
                      <li
                        className="users-catalog__item"
                        key={`item-${user.id}`}
                      >
                        <UserThumbnail
                          user={user}
                          isDark={user.role === UserRole.Coach}
                        />
                      </li>
                    ))}
                  </ul>
                  <div className="show-more users-catalog__show-more">
                    {users && users.totalPages > users.currentPage && (
                      <FilledButton
                        classPrefix="show-more"
                        addClasses="show-more__button--more"
                        type={ButtonType.Button}
                        caption="Показать еще"
                        onClick={handleButtonMoreClick}
                      />
                    )}
                    {users &&
                      users.itemsPerPage > Limits.Catalog &&
                      users.totalPages === users.currentPage && (
                        <FilledButton
                          classPrefix="show-more"
                          type={ButtonType.Button}
                          caption="Вернуться в начало"
                          onClick={handleButtonToTopClick}
                        />
                      )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserCatalog;
