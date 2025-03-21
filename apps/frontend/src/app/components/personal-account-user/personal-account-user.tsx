import { AppRoute } from '@frontend/src/const';
import { Link } from 'react-router-dom';

type PersonalAccountUserProps = {
  caloriesWaste: number;
};

function PersonalAccountUser({
  caloriesWaste,
}: PersonalAccountUserProps): JSX.Element {
  const caloriesWasteWeek = caloriesWaste * 7;
  return (
    <div className="personal-account-user">
      <div className="personal-account-user__schedule">
        <form action="#" method="get">
          <div className="personal-account-user__form">
            <div className="personal-account-user__input">
              <label>
                <span className="personal-account-user__label">
                  План на день, ккал
                </span>
                <input
                  type="text"
                  name="schedule-for-the-day"
                  defaultValue={caloriesWaste.toLocaleString('ru-RU')}
                  className=""
                  disabled
                />
              </label>
            </div>
            <div className="personal-account-user__input">
              <label>
                <span className="personal-account-user__label">
                  План на неделю, ккал
                </span>
                <input
                  type="text"
                  name="schedule-for-the-week"
                  defaultValue={caloriesWasteWeek.toLocaleString('ru-RU')}
                  className=""
                  disabled
                />
              </label>
            </div>
          </div>
        </form>
      </div>
      <div className="personal-account-user__additional-info">
        <Link
          className="thumbnail-link thumbnail-link--theme-light"
          to={AppRoute.Friends}
        >
          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
            <svg width="30" height="26" aria-hidden="true">
              <use xlinkHref="#icon-friends"></use>
            </svg>
          </div>
          <span className="thumbnail-link__text">Мои друзья</span>
        </Link>
        <Link
          className="thumbnail-link thumbnail-link--theme-light"
          to={AppRoute.Purchases}
        >
          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
            <svg width="30" height="26" aria-hidden="true">
              <use xlinkHref="#icon-shopping-cart"></use>
            </svg>
          </div>
          <span className="thumbnail-link__text">Мои покупки</span>
        </Link>
        <div className="thumbnail-spec-gym">
          <div className="thumbnail-spec-gym__image">
            <picture>
              <source
                type="image/webp"
                srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x"
              />
              <img
                src="img/content/thumbnails/nearest-gym-01.jpg"
                srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x"
                width="330"
                height="190"
                alt=""
              />
            </picture>
          </div>
          <div className="thumbnail-spec-gym__header">
            <h3 className="thumbnail-spec-gym__title">
              Скоро тут появится что-то полезное
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalAccountUser;
