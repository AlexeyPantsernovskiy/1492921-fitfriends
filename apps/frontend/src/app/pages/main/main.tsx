import { LookForCompany, PopularTrainings, SpecialForYou, SpecialOffers } from '@frontend/components';
import { useAppDispatch } from '@frontend/src/hooks';
import { getSpecialForYou, getTrainings } from '@frontend/store';

import { useEffect } from 'react';

const Main = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSpecialForYou());
    dispatch(getTrainings(null));
  }, [dispatch]);

  return (
    <>
      <h1 className="visually-hidden">
        FitFriends — Время находить тренировки, спортзалы и друзей спортсменов
      </h1>
      <section className="special-for-you">
        <SpecialForYou />
      </section>
      <section className="special-offers">
        <SpecialOffers />
      </section>
      <section className="popular-trainings">
        <PopularTrainings />
      </section>
      <section className="look-for-company">
        <LookForCompany />
      </section>
    </>
  );
};

export default Main;
