import { ThumbnailLink, ThumbnailNearest } from '@frontend/components';
import { AppRoute } from '@frontend/const';
import { Icon } from '@frontend/types/component';

function PersonalAccountCoach(): JSX.Element {
  return (
    <div className="personal-account-coach">
      <div className="personal-account-coach__navigation">
        <ThumbnailLink link={AppRoute.Main} icon={Icon.MyTraining} />
        <ThumbnailLink link={AppRoute.Purchases} icon={Icon.AddTrain} />
        <ThumbnailLink link={AppRoute.Friends} icon={Icon.Friends} />
        <ThumbnailLink link={AppRoute.Main} icon={Icon.MyOrders} />
        <ThumbnailNearest text="Скоро тут будет интересно" />
      </div>
      {/* нужно добавить на следующих итерациях */}
    </div>
  );
}

export default PersonalAccountCoach;
