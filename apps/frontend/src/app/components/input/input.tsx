import { JSX } from 'react';

export type InputProps = {
  classPrefix?: string;
  name: string;
  caption: string;
  type?: 'text' | 'email' | 'date' | 'password';
  max?: string;
  required?: boolean;
};

const Input = ({
  classPrefix,
  name,
  caption,
  type = 'text',
  max,
  required = true,
}: InputProps): JSX.Element => {
  const addClass = classPrefix ? `${classPrefix}__input` : '';
  return (
    <div className={`custom-input ${addClass}`}>
      <label>
        <span className="custom-input__label">{caption}</span>
        <span className="custom-input__wrapper">
          <input
            type={type}
            name={name}
            {...(max ? { max } : {})}
            {...(type === 'password' ? { autoComplete: 'off' } : {})}
            required={required}
          />
        </span>
      </label>
    </div>
  );
};

export default Input;
