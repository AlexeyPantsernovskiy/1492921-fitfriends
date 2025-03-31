import { discount } from '@frontend/const';
import { Training } from '@project/shared';

interface SpecialOfferCardProps {
  training: Training;
  isActive: boolean;
  onDotClick?: (index: number) => void;
  slideIndex?: number;
}

function SpecialOfferCard({
  training,
  isActive,
  onDotClick,
  slideIndex = 0,
}: SpecialOfferCardProps): JSX.Element {
  const { image, name, description, price } = training;
  const oldPrice = Math.round(price / (1 - discount));

  const handleDotClick = (index: number) => {
    if (onDotClick) {
      onDotClick(index);
    }
  };

  return (
    <li className={`special-offers__item ${isActive ? 'is-active' : ''}`}>
      <aside className="promo-slider">
        <div className="promo-slider__overlay"></div>
        <div className="promo-slider__image">
          <img src={image} width="1040" height="469" alt="promo-photo" />
        </div>
        <div className="promo-slider__header">
          <h3 className="promo-slider__title">{name}</h3>
          <div className="promo-slider__logo">
            <svg width="74" height="74" aria-hidden="true">
              <use xlinkHref="#logotype"></use>
            </svg>
          </div>
        </div>
        <span className="promo-slider__text">{description}</span>
        <div className="promo-slider__bottom-container">
          <div className="promo-slider__slider-dots">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                className={`promo-slider__slider-dot ${
                  index === slideIndex ? 'promo-slider__slider-dot--active' : ''
                }`}
                aria-label={`${index + 1}-й слайд`}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
          <div className="promo-slider__price-container">
            <p className="promo-slider__price">{price} ₽</p>
            <p className="promo-slider__sup">за занятие</p>
            <p className="promo-slider__old-price">{oldPrice} ₽</p>
          </div>
        </div>
      </aside>
    </li>
  );
}

export default SpecialOfferCard;
