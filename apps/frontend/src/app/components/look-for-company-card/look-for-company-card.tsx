import { Link } from 'react-router-dom';

import { Specialization, User } from '@project/shared';
import { AppRoute } from '@frontend/const';

interface LookForCompanyCardProps {
  user: User;
}

function LookForCompanyCard({ user }: LookForCompanyCardProps): JSX.Element {
  return (
    <div className="thumbnail-user thumbnail-user--role-user thumbnail-user--dark">
      <div className="thumbnail-user__image">
        <picture>
          <source type="image/webp" srcSet={user.avatar} />
          <img
            src={user.avatar}
            srcSet={user.avatar}
            width="82"
            height="82"
            alt=""
          />
        </picture>
      </div>
      <div className="thumbnail-user__header">
        <h3 className="thumbnail-user__name">{user.name}</h3>
        <div className="thumbnail-user__location">
          <svg width="14" height="16" aria-hidden="true">
            <use xlinkHref="#icon-location"></use>
          </svg>
          <address className="thumbnail-user__location-address">
            {user.location}
          </address>
        </div>
      </div>
      <ul className="thumbnail-user__hashtags-list">
        {user.questionnaire?.specialization &&
          user.questionnaire.specialization.map((item) => (
            <li className="thumbnail-user__hashtags-item" key={item}>
              <div className="hashtag thumbnail-user__hashtag">
                <span>#{Specialization[item]}</span>
              </div>
            </li>
          ))}
      </ul>
      <Link
        className="btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button"
        to={AppRoute.UserCard.replace(':id', user.id ?? '')}
      >
        Подробнее
      </Link>
    </div>
  );
}

export default LookForCompanyCard;
