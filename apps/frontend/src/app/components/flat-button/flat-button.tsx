import { ButtonType, Icon, IconName } from '@frontend/types/component';
import classNames from 'classnames';
import { MouseEvent, JSX } from 'react';

export type FlatButtonProps = {
  classNamePrefix: string;
  caption: string;
  type?: ButtonType;
  iconName: IconName;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

function FlatButton({
  classNamePrefix,
  caption,
  type = 'button',
  iconName,
  onClick,
}: FlatButtonProps): JSX.Element {
  return (
    <button
      className={classNames(
        'btn-flat',
        'btn-flat--underlined',
        `${classNamePrefix}-button`
      )}
      type={type}
      aria-label={caption}
      onClick={onClick}
    >
      <svg width="12" height="12" aria-hidden="true">
        <use xlinkHref={`#${iconName}`}></use>
      </svg>
      <span>{caption}</span>
    </button>
  );
}

export default FlatButton;
