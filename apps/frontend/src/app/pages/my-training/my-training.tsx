import {
  FilledButton,
  Spinner,
  ThumbnailNearest,
  TrainingCard,
  TrainingCatalogFilter,
} from '@frontend/components';
import { LimitTrainingCard } from '@frontend/const';
import { useAppDispatch, useAppSelector } from '@frontend/src/hooks';
import { getTrainings, trainingSelectors } from '@frontend/store';
import { ButtonType } from '@frontend/types/component';
import { TrainingQuery } from '@project/shared';
import { useEffect, useState } from 'react';

function TrainingCatalog(): JSX.Element {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(trainingSelectors.isTrainingCatalogLoading);
  const trainings = useAppSelector(trainingSelectors.trainingCatalog);
  const [filterParam, setFilterParam] = useState<TrainingQuery>({});
  const [limit, setLimit] = useState<number>(LimitTrainingCard.Catalog);

  // Загрузка данных при изменении фильтров
  useEffect(() => {
    // Сбрасываем лимит при изменении фильтров
    setLimit(LimitTrainingCard.Catalog);
    dispatch(
      getTrainings({ ...filterParam, limit: LimitTrainingCard.Catalog })
    );
  }, [dispatch, filterParam]);

  const handleButtonMoreClick = () => {
    const newLimit = limit + LimitTrainingCard.Catalog;
    setLimit(newLimit);
    dispatch(getTrainings({ ...filterParam, limit: newLimit }));
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
          <h1 className="visually-hidden">Каталог тренировок</h1>
          <div className="gym-catalog-form">
            <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
            <div className="gym-catalog-form__wrapper">
              <button
                className="btn-flat btn-flat--underlined gym-catalog-form__btnback"
                type="button"
              >
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
                <span>Назад</span>
              </button>
              <h3 className="gym-catalog-form__title">Фильтры</h3>
              <TrainingCatalogFilter handleFilterApply={setFilterParam} />
            </div>
          </div>
          <div className="training-catalog">
            {isLoading && <Spinner />}
            {!isLoading && trainings?.totalItems === 0 && (
              <ThumbnailNearest text="По заданным условиям ни чего не найдено" />
            )}
            {!isLoading && trainings && trainings.totalItems > 0 && (
              <>
                <ul className="training-catalog__list">
                  {trainings.entities.map((training) => (
                    <li
                      className="training-catalog__item"
                      key={`training-catalog__item-${training.id}`}
                    >
                      <TrainingCard training={training} />
                    </li>
                  ))}
                </ul>
                <div className="show-more training-catalog__show-more">
                  {trainings &&
                    trainings.totalPages > trainings.currentPage && (
                      <FilledButton
                        classPrefix="show-more"
                        addClasses="show-more__button--more"
                        type={ButtonType.Button}
                        caption="Показать еще"
                        onClick={handleButtonMoreClick}
                      />
                    )}
                  {trainings &&
                    trainings.itemsPerPage > LimitTrainingCard.Catalog &&
                    trainings.totalPages === trainings.currentPage && (
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
    </section>
  );
}

export default TrainingCatalog;
