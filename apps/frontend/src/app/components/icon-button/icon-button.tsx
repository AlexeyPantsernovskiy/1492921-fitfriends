import { IconAttr } from '@frontend/types/component';
import { MouseEvent, JSX } from 'react';

type IconButtonProps = {
  classNames: string;
  icon: IconAttr;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

function IconButton({
  classNames,
  icon,
  onClick,
}: IconButtonProps): JSX.Element {
  return (
    <button
      className={classNames}
      title={icon.caption}
      aria-label={icon.caption.toLowerCase()}
      onClick={onClick}
    >
      <svg width="14" height="16" aria-hidden="true">
        <use xlinkHref={`#${icon.iconName}`}></use>
      </svg>
    </button>
  );
}

export default IconButton;
