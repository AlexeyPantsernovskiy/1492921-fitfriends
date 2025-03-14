import { MouseEvent, JSX } from 'react';

export enum ButtonType {
  Button = 'button',
  Submit = 'submit',
}

type ButtonProps = {
  classPrefix: string;
  caption?: string;
  type?: ButtonType;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({
  classPrefix,
  caption = 'Продолжить',
  type = ButtonType.Submit,
  onClick,
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={`btn ${classPrefix}__button`}
      type={type}
      onClick={onClick}
    >
      {caption}
    </button>
  );
};

export default Button;
