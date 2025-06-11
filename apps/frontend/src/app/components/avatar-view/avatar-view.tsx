import { JSX } from 'react';

export type AvatarViewProps = {
  image: string;
  size?: number;
  baseClassName?: string;
  name?: string;
};

const AvatarView = ({
  image,
  size = 82,
  baseClassName = 'user',
  name = '',
}: AvatarViewProps): JSX.Element => (
  <div className={`thumbnail-${baseClassName}__image`}>
    <picture>
      <source type="image/webp" srcSet={image} />
      <img src={image} srcSet={image} width={size} height={size} alt={name} />
    </picture>
  </div>
);

export default AvatarView;
