import { MouseEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@frontend/src/hooks';
import { getTraining, trainingSelectors } from '@frontend/store';
import { BackButton, Comments, FilledButton, Spinner, TrainingInfo } from '@frontend/components';
import { ButtonType } from '@frontend/types/component';

function TrainingCard(): JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { id } = params;
  const isLoading = useAppSelector(trainingSelectors.isTrainingLoading);

  useEffect(() => {
    if (id) {
      dispatch(getTraining(parseInt(id, 10)));
    }
  }, [dispatch, id]);

  if (!id || isLoading) {
    return <Spinner />
  }

  const HandleClickAddCommentButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    alert('Пока не готово!')
  };

  return (
    <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Карточка тренировки</h1>

            <aside className="reviews-side-bar">
              <BackButton className="btn-flat--underlined reviews-side-bar__back" />
              <h2 className="reviews-side-bar__title">Отзывы</h2>
              <Comments />
              <FilledButton
                caption='Оставить отзыв'
                classPrefix='reviews-side-bar'
                type={ButtonType.Button}
                addClasses='btn--medium'
                onClick={HandleClickAddCommentButton} />
            </aside>
            <TrainingInfo />
          </div>
        </div>
      </section>
  );
}

export default TrainingCard;
