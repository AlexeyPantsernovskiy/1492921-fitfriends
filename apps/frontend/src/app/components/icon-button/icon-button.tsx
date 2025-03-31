import { IconAttr } from '@frontend/types/component';
import { MouseEvent, JSX, forwardRef } from 'react';

type IconButtonProps = {
  classNames: string;
  icon: IconAttr;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ classNames, icon, onClick }, ref) => {
    return (
      <button
        className={classNames}
        title={icon.caption}
        aria-label={icon.caption.toLowerCase()}
        ref={ref}
        onClick={onClick}
      >
        <svg width={icon.width} height={icon.height} aria-hidden="true">
          <use xlinkHref={`#${icon.name}`}></use>
        </svg>
      </button>
    );
  }
);

export default IconButton;
