import { useState } from 'react';
import { useAppSelector } from '@frontend/src/hooks';
import { trainingSelectors } from '@frontend/store';
import {
  Spinner,
  ThumbnailNearest,
  SpecialOfferCard,
} from '@frontend/components';

function SpecialOffers(): JSX.Element {
  const isLoading = useAppSelector(trainingSelectors.isTrainingsLoading);
  const specialOffers = useAppSelector(trainingSelectors.specialOffers);
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className="container">
      <div className="special-offers__wrapper">
        <h2 className="visually-hidden">Специальные предложения</h2>
        {isLoading || !specialOffers ? (
          <Spinner />
        ) : (
          <ul className="special-offers__list">
            {specialOffers &&
              specialOffers.map((training, index) => (
                <SpecialOfferCard
                  key={training.id}
                  training={training}
                  isActive={index === activeSlide}
                  onDotClick={setActiveSlide}
                  slideIndex={activeSlide}
                />
              ))}
          </ul>
        )}
        <ThumbnailNearest />
      </div>
    </div>
  );
}

export default SpecialOffers;
