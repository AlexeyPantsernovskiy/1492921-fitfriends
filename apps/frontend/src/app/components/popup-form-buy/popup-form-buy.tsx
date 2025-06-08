import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@frontend/src/hooks';
import { OrderType, PaymentType, Training } from '@project/shared';
import { createOrder, orderSelectors } from '@frontend/store';
import { ButtonType, Icon, PayType } from '@frontend/types/component';

import IconButton from '../icon-button/icon-button';
import FilledButton from '../filled-button/filled-button';

interface PopupCommentProps {
  training: Training;
  onClose: () => void;
}

function PopupFormBuy({ training, onClose }: PopupCommentProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isSaving = useAppSelector(orderSelectors.isOrderSaving);

  const { price, name, image, id: trainingId } = training;
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState(0);
  const [paymentType, setPaymentType] = useState<PaymentType | null>(null);

  useEffect(() => {
    setAmount(price * quantity);
  }, [quantity, price]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose]);

  const handleBuyButtonClick = async () => {
    if (!paymentType) {
      return;
    }
    try {
      await dispatch(
        createOrder({
          quantity,
          paymentType,
          price,
          trainingId,
          type: OrderType.Ticket,
        })
      ).unwrap();
      onClose();
    } catch (error) {
      throw new Error(`Ошибка при сохранении данных: ${error}`);
    }
  };

  return (
    <div className="popup-form popup-form--buy" onClick={onClose}>
      <section className="popup">
        <div className="popup__wrapper" onClick={(e) => e.stopPropagation()}>
          <div className="popup-head">
            <h2 className="popup-head__header">Купить тренировку</h2>
            <IconButton
              classNames="btn-icon btn-icon--outlined btn-icon--big"
              icon={Icon.Close}
              onClick={onClose}
            />
          </div>
          <div className="popup__content popup__content--purchases">
            <div className="popup__product">
              <div className="popup__product-image">
                <picture>
                  <img src={image} width="98" height="80" alt="" />
                </picture>
              </div>
              <div className="popup__product-info">
                <h3 className="popup__product-title">{name}</h3>
                <p className="popup__product-price">{price} ₽</p>
              </div>
              <div className="popup__product-quantity">
                <p className="popup__quantity">Количество</p>
                <div className="input-quantity">
                  <IconButton
                    classNames="btn-icon btn-icon--quantity"
                    icon={Icon.Minus}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  />
                  <div className="input-quantity__input">
                    <label>
                      <input type="text" value={quantity} size={2} readOnly />
                    </label>
                  </div>
                  <IconButton
                    classNames="btn-icon btn-icon--quantity"
                    icon={Icon.Plus}
                    onClick={() => setQuantity(quantity + 1)}
                  />
                </div>
              </div>
            </div>
            <section className="payment-method">
              <h4 className="payment-method__title">Выберите способ оплаты</h4>
              <ul className="payment-method__list">
                {Object.values(PayType).map((item) => (
                  <li className="payment-method__item">
                    <div className="btn-radio-image">
                      <label>
                        <input
                          type="radio"
                          name="payment-purchases"
                          aria-label={item.label}
                          onClick={() => setPaymentType(item.code)}
                        />
                        <span className="btn-radio-image__image">
                          <svg width="58" height="20" aria-hidden="true">
                            <use xlinkHref={`#${item.logo}`}></use>
                          </svg>
                        </span>
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
            <div className="popup__total">
              <p className="popup__total-text">Итого</p>
              <svg
                className="popup__total-dash"
                width="310"
                height="2"
                aria-hidden="true"
              >
                <use xlinkHref="#dash-line"></use>
              </svg>
              <p className="popup__total-price">{amount}&nbsp;₽</p>
            </div>
            <div className="popup__button">
              <FilledButton
                caption="Купить"
                type={ButtonType.Button}
                onClick={handleBuyButtonClick}
                disabled={isSaving || !paymentType}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PopupFormBuy;
