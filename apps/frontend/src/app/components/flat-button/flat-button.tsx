import { ButtonType, IconAttr, IconPosition } from '@frontend/types/component';
import classNames from 'classnames';
import { MouseEvent, JSX } from 'react';

export type FlatButtonProps = {
  className: string;
  caption?: string;
  type?: ButtonType;
  icon: IconAttr;
  iconPosition?: IconPosition;
  isUnderline?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

function FlatButton({
  className,
  caption,
  type = 'button',
  icon,
  iconPosition = IconPosition.Right,
  isUnderline = false,
  onClick,
}: FlatButtonProps): JSX.Element {
  const btnCaption = caption ?? icon?.caption;
  return (
    <button
      className={classNames(
        'btn-flat',
        { 'btn-flat--underlined': isUnderline },
        className
      )}
      type={type}
      {...(!caption ? { ariaLabel: caption } : {})}
      onClick={onClick}
    >
      {(iconPosition === IconPosition.Right) && <span>{btnCaption}</span>}
      <svg width={icon.width} height={icon.height} aria-hidden="true">
        <use xlinkHref={`#${icon.name}`}></use>
      </svg>
      {(iconPosition === IconPosition.Left) && <span>{btnCaption}</span>}
    </button>
  );
}

export default FlatButton;
