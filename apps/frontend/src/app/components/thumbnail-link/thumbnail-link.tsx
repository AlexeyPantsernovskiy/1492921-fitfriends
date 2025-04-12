import { JSX } from 'react';
import { Link } from 'react-router-dom';

import { RouteApp } from '@frontend/types/types';
import { IconAttr } from '@frontend/types/component';

export type ThumbnailLinkProps = {
  text?: string;
  link: RouteApp;
  icon: IconAttr;
};

const ThumbnailLink = ({
  text,
  link,
  icon,
}: ThumbnailLinkProps): JSX.Element => {
  return (
    <Link className="thumbnail-link thumbnail-link--theme-light" to={link}>
      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
        <svg width={icon.width} height={icon.height} aria-hidden="true">
          <use xlinkHref={`#${icon.name}`}></use>
        </svg>
      </div>
      <span className="thumbnail-link__text">{text || icon.caption}</span>
    </Link>
  );
};

export default ThumbnailLink;
