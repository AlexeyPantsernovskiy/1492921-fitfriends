import { useEffect, useRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

import { Icon } from '@frontend/types/component';
import history from '@frontend/src/history';
import { AppRoute, Limits } from '@frontend/const';
import { FlatButton, IconButton, UserThumbnail } from '@frontend/components';
import { getLookForCompany, userSelectors } from '@frontend/store';
import { useAppDispatch, useAppSelector } from '@frontend/src/hooks';

function LookForCompany(): JSX.Element {
  const dispatch = useAppDispatch();
  const users = useAppSelector(userSelectors.users);
  const isLoading = useAppSelector(userSelectors.isLoading);
  const sliderRef = useRef<SwiperRef>(null);

  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    dispatch(getLookForCompany(Limits.LookForCompany));
  }, [dispatch]);

  return (
    <div className="container">
      <div className="look-for-company__wrapper">
        <div className="look-for-company__title-wrapper">
          <h2 className="look-for-company__title">
            Ищут компанию для тренировки
          </h2>
          <FlatButton
            className="btn-flat--light look-for-company__button"
            icon={Icon.ViewAll}
            onClick={() => history.push(AppRoute.Users)}
          />
          <div className="look-for-company__controls">
            <IconButton
              classNames="btn-icon btn-icon--outlined look-for-company__control"
              icon={Icon.Prev}
              ref={prevButtonRef}
              onClick={() => sliderRef.current?.swiper.slidePrev()}
            />
            <IconButton
              classNames="btn-icon btn-icon--outlined look-for-company__control"
              icon={Icon.Next}
              ref={nextButtonRef}
              onClick={() => sliderRef.current?.swiper.slideNext()}
            />
          </div>
        </div>
        {isLoading && <Swiper />}
        {!isLoading && users && (
          <Swiper
            slidesPerView={Limits.SliderLookForCompany}
            className="look-for-company__list"
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
            {users.entities.map((user, index) => (
              <SwiperSlide
                key={`SwiperSlide-${index}`}
                className="look-for-company__item"
              >
                <li className="look-for-company__item">
                  <UserThumbnail user={user} isDark isOutline />
                </li>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}

export default LookForCompany;
