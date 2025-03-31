import { MouseEvent, JSX } from 'react';

import { ButtonType } from '@frontend/types/component';
import classNames from 'classnames';

type FilledButtonProps = {
  classPrefix?: string;
  caption?: string;
  type?: ButtonType;
  addClasses?: string;
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const FilledButton = ({
  classPrefix,
  caption = 'Продолжить',
  type = ButtonType.Submit,
  addClasses = '',
  disabled,
  onClick,
}: FilledButtonProps): JSX.Element => {
  return (
    <button
      className={classNames(
        'btn',
        classPrefix && `${classPrefix}__button`,
        addClasses
      )}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {caption}
    </button>
  );
};

export default FilledButton;
