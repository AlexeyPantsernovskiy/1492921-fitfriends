import { ThumbnailLink, ThumbnailNearest } from '@frontend/components';
import { AppRoute } from '@frontend/const';
import Certificates from '../certificates/certificates';
import { Icon } from '@frontend/types/component';

function PersonalAccountCoach(): JSX.Element {
  return (
    <div className="personal-account-coach">
      <div className="personal-account-coach__navigation">
        <ThumbnailLink link={AppRoute.MyTraining} icon={Icon.MyTraining} />
        <ThumbnailLink link={AppRoute.CreateTraining} icon={Icon.AddTrain} />
        <ThumbnailLink link={AppRoute.Friends} icon={Icon.Friends} />
        <ThumbnailLink link={AppRoute.MyOrders} icon={Icon.MyOrders} />
        <div className="personal-account-coach__calendar">
          <ThumbnailNearest text="Скоро тут будет интересно" />
        </div>
      </div>
      <Certificates />
    </div>
  );
}

export default PersonalAccountCoach;
