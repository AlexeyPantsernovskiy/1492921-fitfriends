import { Link } from 'react-router-dom';

import { Specialization, UserRdo, UserRole } from '@project/shared';
import { AppRoute } from '@frontend/const';

import Location from '../location/location';
import AvatarView from '../avatar-view/avatar-view';
import Hashtags from '../hashtags/hashtags';

interface UserThumbnailProps {
  user: UserRdo;
  isDark?: boolean;
  isOutline?: boolean;
}

function UserThumbnail({
  user,
  isDark = false,
  isOutline = false,
}: UserThumbnailProps): JSX.Element {
  const { avatar, name, location, questionnaire, role } = user;
  return (
    <div
      className={`thumbnail-user thumbnail-user--role-${
        role === UserRole.Sportsman ? 'user' : 'coach'
      } ${isDark ? 'thumbnail-user--dark' : ''}`}
    >
      <AvatarView image={avatar} name={`${name}'s avatar`} />
      <div className="thumbnail-user__header">
        <h3 className="thumbnail-user__name">{name}</h3>
        <Location address={location} />
      </div>
      <Hashtags
        tags={questionnaire?.specialization}
        dictionary={Specialization}
        listClassName="thumbnail-user__hashtags-list"
        itemClassName="thumbnail-user__hashtags-item"
        divClassName="hashtag thumbnail-user__hashtag"
      />
      <Link
        className={`btn ${isOutline ? 'btn--outlined' : ''} ${isDark ? 'btn--dark-bg' : ''} btn--medium thumbnail-user__button`}
        to={AppRoute.UserCard.replace(':id', user.id ?? '')}
      >
        Подробнее
      </Link>
    </div>
  );
}

export default UserThumbnail;
