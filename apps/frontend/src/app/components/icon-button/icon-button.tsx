import { IconAttr } from '@frontend/types/component';
import { MouseEvent, JSX } from 'react';

type IconButtonProps = {
  classNames: string;
  icon: IconAttr;
  ref?: React.RefObject<HTMLButtonElement>;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

function IconButton({
  classNames,
  icon,
  ref,
  onClick,
}: IconButtonProps): JSX.Element {
  return (
    <button
      className={classNames}
      title={icon.caption}
      aria-label={icon.caption.toLowerCase()}
      {...(!ref ? { ref: ref } : {})}
      onClick={onClick}
    >
      <svg width={icon.width} height={icon.height} aria-hidden="true">
        <use xlinkHref={`#${icon.name}`}></use>
      </svg>
    </button>
  );
}

export default IconButton;
