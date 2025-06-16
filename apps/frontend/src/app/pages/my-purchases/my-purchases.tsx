import { useEffect, useState } from 'react';

import {
  BackButton,
  FilledButton,
  Spinner,
  ThumbnailNearest,
  TrainingCard,
} from '@frontend/components';
import { useAppDispatch, useAppSelector } from '@frontend/src/hooks';
import { getOrders, orderSelectors } from '@frontend/store';
import { DEFAULT_FILTER_PURCHASE_ACTIVE, Limits } from '@frontend/const';
import { ButtonType } from '@frontend/types/component';

function MyPurchases(): JSX.Element {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(orderSelectors.isOrdersLoading);
  const orders = useAppSelector(orderSelectors.orders);
  const [limit, setLimit] = useState<number>(Limits.MyPurchases);
  const [activeOnly, setActiveOnly] = useState(DEFAULT_FILTER_PURCHASE_ACTIVE);

  useEffect(() => {
    dispatch(
      getOrders({
        limit,
        activeOnly,
      })
    );
  }, [dispatch, limit, activeOnly]);

  const handleButtonMoreClick = () => {
    const newLimit = limit + Limits.MyPurchases;
    setLimit(newLimit);
    dispatch(getOrders({ limit: newLimit, activeOnly }));
  };

  const handleButtonToTopClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <section className="my-purchases">
      <div className="container">
        <div className="my-purchases__wrapper">
          <BackButton className="my-purchases__back" />
          <div className="my-purchases__title-wrapper">
            <h1 className="my-purchases__title">Мои покупки</h1>
            <div className="my-purchases__controls">
              <div
                className="custom-toggle custom-toggle--switch custom-toggle--switch-right my-purchases__switch"
                data-validate-type="checkbox"
              >
                <label>
                  <input
                    type="checkbox"
                    value="user-agreement-1"
                    name="user-agreement"
                    defaultChecked={activeOnly}
                    onClick={() => setActiveOnly(!activeOnly)}
                  />
                  <span className="custom-toggle__icon">
                    <svg width="9" height="6" aria-hidden="true">
                      <use xlinkHref="#arrow-check"></use>
                    </svg>
                  </span>
                  <span className="custom-toggle__label">Только активные</span>
                </label>
              </div>
            </div>
          </div>
          {isLoading && <Spinner />}
          {!orders && <ThumbnailNearest text="Пока у Вас нет покупок" />}
          {orders && (
            <ul className="my-purchases__list">
              {orders.entities.map((order) => (
                <li className="my-purchases__item" key={order.training.id}>
                  <TrainingCard training={order} />
                </li>
              ))}
            </ul>
          )}
          <div className="show-more my-purchases__show-more">
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
              orders.itemsPerPage > Limits.MyPurchases &&
              orders.totalPages === orders.currentPage && (
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

export default MyPurchases;
