import { JSX } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { FilledButton } from '@frontend/components';
import { ButtonType } from '@frontend/types/component';
import { AppRoute } from '@frontend/const';

const Intro = (): JSX.Element => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(AppRoute.Register);
  };

  return (
    <div className="intro">
      <div className="intro__background">
        <picture>
          <source
            type="image/webp"
            srcSet="img/content/sitemap/background.webp, img/content/sitemap/background@2x.webp 2x"
          />
          <img
            src="img/content/sitemap/background.jpg"
            srcSet="img/content/sitemap/background@2x.jpg 2x"
            width="1440"
            height="1024"
            alt="Фон с бегущей девушкой"
          />
        </picture>
      </div>
      <div className="intro__wrapper">
        <svg className="intro__icon" width="60" height="60" aria-hidden="true">
          <use xlinkHref="#icon-logotype" />
        </svg>
        <div className="intro__title-logo">
          <picture>
            <source
              type="image/webp"
              srcSet="img/content/sitemap/title-logo.webp, img/content/sitemap/title-logo@2x.webp 2x"
            />
            <img
              src="img/content/sitemap/title-logo.png"
              srcSet="img/content/sitemap/title-logo@2x.png 2x"
              width="934"
              height="455"
              alt="Логотип Fit Friends"
            />
          </picture>
        </div>
        <div className="intro__buttons">
          <FilledButton
            caption="Регистрация"
            type={ButtonType.Button}
            classPrefix="intro"
            onClick={handleButtonClick}
          />
          <p className="intro__text">
            Есть аккаунт?{' '}
            <Link className="intro__link" to={AppRoute.Login}>
              Вход
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Intro;
