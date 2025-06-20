import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@frontend/src/hooks';
import { SortDirection, SortType } from '@project/shared';
import {
  BackButton,
  FilledButton,
  Spinner,
  ThumbnailNearest,
  TrainingCard,
} from '@frontend/components';
import { getOrders, orderSelectors } from '@frontend/store';
import { ButtonType } from '@frontend/types/component';
import { Limits } from '@frontend/const';

type ButtonSortProps = {
  caption: string;
  sortType: SortType;
  sortDirection: SortDirection;
  onClick: (sortType: SortType) => void;
};

const ButtonSort = ({
  caption,
  sortType,
  sortDirection,
  onClick,
}: ButtonSortProps): JSX.Element => {
  return (
    <button
      className="btn-filter-sort"
      type="button"
      onClick={() => {
        onClick(sortType);
      }}
    >
      <span>{caption}</span>
      <svg width="16" height="10" aria-hidden="true">
        <use
          xlinkHref={
            sortDirection === SortDirection.Desc
              ? '#icon-sort-up'
              : '#icon-sort-down'
          }
        />
      </svg>
    </button>
  );
};

function MyOrders(): JSX.Element {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(orderSelectors.isOrdersLoading);
  const orders = useAppSelector(orderSelectors.orders);

  const [limit, setLimit] = useState<number>(Limits.MyOrders);
  const [sortBy, setSortBy] = useState<SortType>();
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.Desc
  );

  const onSortingButtonClick = (sortType: SortType) => {
    if (sortBy === sortType) {
      setSortDirection(
        sortDirection === SortDirection.Asc
          ? SortDirection.Desc
          : SortDirection.Asc
      );
      return;
    }
    setSortBy(sortType);
  };

  useEffect(() => {
    dispatch(
      getOrders({
        limit,
        sortDirection,
        sortBy,
      })
    );
  }, [dispatch, limit, sortBy, sortDirection]);

  const handleButtonMoreClick = () => {
    const newLimit = limit + Limits.MyOrders;
    setLimit(newLimit);
    dispatch(
      getOrders({
        limit: newLimit,
        sortDirection,
        sortBy,
      })
    );
  };

  const handleButtonToTopClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <section className="my-orders">
      <div className="container">
        <div className="my-orders__wrapper">
          <BackButton className="btn-flat--underlined my-orders__back" />
          <div className="my-orders__title-wrapper">
            <h1 className="my-orders__title">Мои заказы</h1>
            <div className="sort-for">
              <p>Сортировать по:</p>
              <div className="sort-for__btn-container">
                <ButtonSort
                  caption="Сумме"
                  sortType={SortType.Amount}
                  sortDirection={sortDirection}
                  onClick={onSortingButtonClick}
                />
                <ButtonSort
                  caption="Количеству"
                  sortType={SortType.Quantity}
                  sortDirection={sortDirection}
                  onClick={onSortingButtonClick}
                />
              </div>
            </div>
          </div>

          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {!orders && <ThumbnailNearest text="У Вас пока нет заказов" />}
              {orders && (
                <>
                  <ul className="my-orders__list">
                    {orders.entities.map((order) => (
                      <li className="my-orders__item" key={order.training.id}>
                        <TrainingCard training={order} />
                      </li>
                    ))}
                  </ul>
                  <div className="show-more my-orders__show-more">
                    {orders && orders.totalPages > orders.currentPage && (
                      <FilledButton
                        classPrefix="show-more"
                        addClasses="show-more__button--more"
                        type={ButtonType.Button}
                        caption="Показать еще"
                        onClick={handleButtonMoreClick}
                      />
                    )}
                    {orders &&
                      orders.itemsPerPage > Limits.MyOrders &&
                      orders.totalPages === orders.currentPage && (
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
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default MyOrders;
