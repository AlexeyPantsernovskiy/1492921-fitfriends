import {
  BackButton,
  FilledButton,
  Spinner,
  ThumbnailNearest,
  TrainingCard,
} from '@frontend/components';
import { Limits } from '@frontend/const';
import { useAppDispatch, useAppSelector } from '@frontend/src/hooks';
import { getTrainings, trainingSelectors } from '@frontend/store';
import { ButtonType } from '@frontend/types/component';
import { TrainingQuery } from '@project/shared';
import { useEffect, useState } from 'react';

type TrainingCatalogProps = {
  caption: string;
  classPrefixForm: string;
  classPrefixCatalog: string;
  isDivInnerPageContent?: boolean;
  formFilter: React.ComponentType<{
    handleFilterApply: (params: TrainingQuery) => void;
  }>;
};

function TrainingCatalog({
  caption,
  classPrefixForm,
  classPrefixCatalog,
  isDivInnerPageContent,
  formFilter: FormFilterComponent,
}: TrainingCatalogProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(trainingSelectors.isTrainingCatalogLoading);
  const trainings = useAppSelector(trainingSelectors.trainingCatalog);
  const [filterParam, setFilterParam] = useState<TrainingQuery>({});
  const [limit, setLimit] = useState<number>(Limits.Catalog);

  // Загрузка данных при изменении фильтров
  useEffect(() => {
    // Сбрасываем лимит при изменении фильтров
    setLimit(Limits.Catalog);
    dispatch(getTrainings({ ...filterParam, limit: Limits.Catalog }));
  }, [dispatch, filterParam]);

  const handleButtonMoreClick = () => {
    const newLimit = limit + Limits.Catalog;
    setLimit(newLimit);
    dispatch(getTrainings({ ...filterParam, limit: newLimit }));
  };

  const handleButtonToTopClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  function Catalog(): JSX.Element {
    return (
      <div className={classPrefixCatalog}>
        {isLoading && <Spinner />}
        {!isLoading && trainings?.totalItems === 0 && (
          <ThumbnailNearest text="По заданным условиям ни чего не найдено" />
        )}
        {trainings && trainings.totalItems > 0 && (
          <>
            <ul className={`${classPrefixCatalog}__list`}>
              {trainings.entities.map((training) => (
                <li
                  className={`${classPrefixCatalog}__item`}
                  key={`${classPrefixCatalog}__item-${training.id}`}
                >
                  <TrainingCard training={training} />
                </li>
              ))}
            </ul>
            <div className={`show-more ${classPrefixCatalog}__show-more`}>
              {trainings && trainings.totalPages > trainings.currentPage && (
                <FilledButton
                  classPrefix="show-more"
                  addClasses="show-more__button--more"
                  type={ButtonType.Button}
                  caption="Показать еще"
                  onClick={handleButtonMoreClick}
                />
              )}
              {trainings &&
                trainings.itemsPerPage > Limits.Catalog &&
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
    );
  }

  return (
    <section className="inner-page">
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">{caption}</h1>
          <div className={classPrefixForm}>
            <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
            <div className={`${classPrefixForm}__wrapper`}>
              <BackButton
                className={`btn-flat btn-flat--underlined ${classPrefixForm}__btnback`}
              />
              <h3 className={`${classPrefixForm}__title`}>Фильтры</h3>
              <FormFilterComponent handleFilterApply={setFilterParam} />
            </div>
          </div>
          {isDivInnerPageContent ? (
            <div className="inner-page__content">
              <Catalog />
            </div>
          ) : (
            <Catalog />
          )}
        </div>
      </div>
    </section>
  );
}

export default TrainingCatalog;
