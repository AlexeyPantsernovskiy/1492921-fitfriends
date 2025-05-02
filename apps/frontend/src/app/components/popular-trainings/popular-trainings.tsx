import { useRef } from 'react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import { trainingSelectors } from '@frontend/store';
import { AppRoute, LimitTrainingCard } from '@frontend/const';
import { Icon } from '@frontend/types/component';

import {
  Spinner,
  FlatButton,
  IconButton,
  TrainingCard,
  ThumbnailNearest,
} from '@frontend/components';

import history from '@frontend/src/history';
import { useAppSelector } from '@frontend/src/hooks';

function PopularTrainings(): JSX.Element {
  const isLoading = useAppSelector(trainingSelectors.isTrainingsLoading);
  const trainings = useAppSelector(trainingSelectors.popularTrainings);

  const sliderRef = useRef<SwiperRef>(null);

  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="container">
      <div className="popular-trainings__wrapper">
        <div className="popular-trainings__title-wrapper">
          <h2 className="popular-trainings__title">Популярные тренировки</h2>
          <FlatButton
            className="popular-trainings__button"
            icon={Icon.ViewAll}
            onClick={() => history.push(AppRoute.Catalog)}
          />
          <div className="popular-trainings__controls">
            <IconButton
              classNames="btn-icon popular-trainings__control"
              icon={Icon.Prev}
              ref={prevButtonRef}
              onClick={() => sliderRef.current?.swiper.slidePrev()}
            />
            <IconButton
              classNames="btn-icon popular-trainings__control"
              icon={Icon.Next}
              ref={nextButtonRef}
              onClick={() => sliderRef.current?.swiper.slideNext()}
            />
          </div>
        </div>
        {isLoading || !trainings ? (
          <Spinner />
        ) : trainings.length === 0 ? (
          <ThumbnailNearest />
        ) : (
          <Swiper
            slidesPerView={LimitTrainingCard.SliderPopular}
            className="popular-trainings__list"
            modules={[Navigation]}
            ref={sliderRef}
            onBeforeInit={(swiper) => {
              if (prevButtonRef.current) {
                swiper.navigation.prevEl = prevButtonRef.current;
              }
              if (nextButtonRef.current) {
                swiper.navigation.nextEl = nextButtonRef.current;
              }
            }}
          >
            {trainings.map((training) => (
              <SwiperSlide
                key={`SwiperSlide-${training.id}`}
                className="popular-trainings__item"
              >
                <TrainingCard training={training} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}

export default PopularTrainings;
