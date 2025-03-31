import { useRef } from 'react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import { useAppSelector } from '@frontend/src/hooks';
import { trainingSelectors } from '@frontend/store';
import { IconButton, SpecialForYouCard, Spinner, ThumbnailNearest } from '@frontend/components';
import { Icon } from '@frontend/types/component';
import { LimitTrainingCard } from '@frontend/const';

function SpecialForYou(): JSX.Element {
  const isLoading = useAppSelector(trainingSelectors.isSpecialForYouLoading);
  const trainings = useAppSelector(trainingSelectors.specialForYou);

  const sliderRef = useRef<SwiperRef>(null);

  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="container">
      <div className="special-for-you__wrapper">
        <div className="special-for-you__title-wrapper">
          <h2 className="special-for-you__title">
            Специально подобрано для вас
          </h2>
          <div className="special-for-you__controls">
            <IconButton
              classNames="btn-icon special-for-you__control prev-slide-button"
              icon={Icon.Prev}
              ref={prevButtonRef}
              onClick={() => sliderRef.current?.swiper.slidePrev()}
            />
            <IconButton
              classNames="btn-icon special-for-you__control next-slide-button"
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
            slidesPerView={LimitTrainingCard.SliderSpecialForYou}
            className="special-for-you__list"
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
                className="special-for-you__item"
              >
                <SpecialForYouCard
                  training={training}
                  key={`special-for-you__item-${training.id}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}

export default SpecialForYou;
