import { Link } from 'react-router-dom';

import {
  Specialization,
  Training,
  TrainingMyOrderTotal,
} from '@project/shared';
import { AppRoute } from '@frontend/const';

interface TrainingCardProps {
  training: Training | TrainingMyOrderTotal;
}

function TrainingCard({ training }: TrainingCardProps): JSX.Element {
  const isCardWithTotal =
    (training as TrainingMyOrderTotal).quantity !== undefined;
  const trainingInfo = isCardWithTotal
    ? (training as TrainingMyOrderTotal).training
    : (training as Training);
  return (
    <div className="thumbnail-training">
      <div className="thumbnail-training__inner">
        <div className="thumbnail-training__image">
          <picture>
            <img src={trainingInfo.image} width="330" height="190" alt="" />
          </picture>
        </div>
        <p className="thumbnail-training__price">
          {trainingInfo.price === 0 ? (
            'Бесплатно'
          ) : (
            <>
              <span className="thumbnail-training__price-value">
                {trainingInfo.price}
              </span>
              <span>₽</span>
            </>
          )}
        </p>
        <h3 className="thumbnail-training__title">{trainingInfo.name}</h3>
        <div className="thumbnail-training__info">
          <ul className="thumbnail-training__hashtags-list">
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag">
                <span>#{Specialization[trainingInfo.specialization]}</span>
              </div>
            </li>
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag">
                <span>#{trainingInfo.calories}ккал</span>
              </div>
            </li>
          </ul>
          <div className="thumbnail-training__rate">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
            <span className="thumbnail-training__rate-value">
              {trainingInfo.rating}
            </span>
          </div>
        </div>
        <div className="thumbnail-training__text-wrapper">
          <p className="thumbnail-training__text">{trainingInfo.description}</p>
        </div>
        {isCardWithTotal && (
          <Link
            className="btn-flat btn-flat--underlined thumbnail-training__button-orders"
            to={AppRoute.TrainingCard.replace(
              ':id',
              trainingInfo.id.toString()
            )}
          >
            <svg width="18" height="18" aria-hidden="true">
              <use xlinkHref="#icon-info"></use>
            </svg>
            <span>Подробнее</span>
          </Link>
        )}
        {!isCardWithTotal && (
          <div className="thumbnail-training__button-wrapper">
            <Link
              className="btn btn--small thumbnail-training__button-catalog"
              to={AppRoute.TrainingCard.replace(
                ':id',
                trainingInfo.id.toString()
              )}
            >
              Подробнее
            </Link>
            <Link
              className="btn btn--small btn--outlined thumbnail-training__button-catalog"
              to={AppRoute.TrainingCard.replace(
                ':id',
                trainingInfo.id.toString()
              )}
            >
              Отзывы
            </Link>
          </div>
        )}
      </div>
      {isCardWithTotal && (
        <div className="thumbnail-training__total-info">
          <div className="thumbnail-training__total-info-card">
            <svg width="32" height="32" aria-hidden="true">
              <use xlinkHref="#icon-chart"></use>
            </svg>
            <p className="thumbnail-training__total-info-value">
              {(training as TrainingMyOrderTotal).quantity}
            </p>
            <p className="thumbnail-training__total-info-text">
              Куплено тренировок
            </p>
          </div>
          <div className="thumbnail-training__total-info-card">
            <svg width="31" height="28" aria-hidden="true">
              <use xlinkHref="#icon-wallet"></use>
            </svg>
            <p className="thumbnail-training__total-info-value">
              {(training as TrainingMyOrderTotal).amount}
              <span>₽</span>
            </p>
            <p className="thumbnail-training__total-info-text">Общая сумма</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TrainingCard;
