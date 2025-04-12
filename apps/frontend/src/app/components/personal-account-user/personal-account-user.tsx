import { Icon } from '@frontend/types/component';
import { ThumbnailLink, ThumbnailNearest } from '@frontend/components';
import { AppRoute } from '@frontend/const';

type InputCaloriesProps = {
  caption: string;
  name: string;
  value: number;
};

function InputCalories({
  caption,
  name,
  value,
}: InputCaloriesProps): JSX.Element {
  return (
    <div className="personal-account-user__input">
      <label>
        <span className="personal-account-user__label">{caption}</span>
        <input
          type="text"
          name={name}
          defaultValue={value.toLocaleString('ru-RU')}
          className=""
          disabled
        />
      </label>
    </div>
  );
}

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
            <InputCalories
              caption="План на день, ккал"
              name="schedule-for-the-day"
              value={caloriesWaste}
            />
            <InputCalories
              caption="План на неделю, ккал"
              name="schedule-for-the-week"
              value={caloriesWasteWeek}
            />
          </div>
        </form>
      </div>
      <div className="personal-account-user__additional-info">
        <ThumbnailLink link={AppRoute.Purchases} icon={Icon.Friends} />
        <ThumbnailLink link={AppRoute.Purchases} icon={Icon.MyPurchases} />
        <ThumbnailNearest />
      </div>
    </div>
  );
}

export default PersonalAccountUser;
