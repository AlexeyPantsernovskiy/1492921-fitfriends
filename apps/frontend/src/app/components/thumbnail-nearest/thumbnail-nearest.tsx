import { JSX } from 'react';

import { TextAlign } from '@frontend/types/component';

export type ThumbnailNearestProps = {
  text?: string;
  align?: TextAlign;
};

const ThumbnailNearest = ({
  text = 'Скоро здесь появится что-то полезное',
  align = TextAlign.Center,
}: ThumbnailNearestProps): JSX.Element => {
  return (
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
      <div className="thumbnail-spec-gym__header" style={{ textAlign: align }}>
        <h3 className="thumbnail-spec-gym__title">{text}</h3>
      </div>
    </div>
  );
};

export default ThumbnailNearest;
