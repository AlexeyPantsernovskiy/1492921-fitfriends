import { MouseEvent, JSX } from 'react';

import { ButtonType } from '@frontend/types/component';

type FilledButtonProps = {
  classPrefix: string;
  caption?: string;
  type?: ButtonType;
  addClasses?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const FilledButton = ({
  classPrefix,
  caption = 'Продолжить',
  type = ButtonType.Submit,
  addClasses = '',
  onClick,
}: FilledButtonProps): JSX.Element => {
  return (
    <button
      className={`btn ${classPrefix}__button ${addClasses}`}
      type={type}
      onClick={onClick}
    >
      {caption}
    </button>
  );
};

export default FilledButton;
