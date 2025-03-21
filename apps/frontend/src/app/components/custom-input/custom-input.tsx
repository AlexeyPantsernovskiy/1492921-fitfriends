import { JSX } from 'react';
import classNames from 'classnames';

import { InputType } from '@frontend/types/component';

export type CustomInputProps = {
  classPrefix?: string;
  name: string;
  caption: string;
  value?: string;
  type?: InputType;
  rightText?: string;
  min?: number;
  max?: string;
  disabled?: boolean;
  required?: boolean;
};

const CustomInput = ({
  classPrefix,
  name,
  caption,
  value,
  type = InputType.Text,
  min,
  max,
  rightText,
  disabled,
  required = true,
}: CustomInputProps): JSX.Element => {
  const addEditIntoClass = (disabled ?? true) ? '' : '-edit';
  const addClass = classPrefix
    ? `${classPrefix}${addEditIntoClass}__input`
    : '';
  return (
    <div
      className={classNames(
        'custom-input',
        { [addClass]: addClass },
        { 'custom-input--readonly': disabled },
        { 'custom-input--with-text-right': rightText }
      )}
    >
      <label>
        <span className="custom-input__label">{caption}</span>
        <span className="custom-input__wrapper">
          <input
            type={type}
            name={name}
            {...(value ? { defaultValue: value } : {})}
            {...(min ? { min } : {})}
            {...(max ? { max } : {})}
            {...(type === 'password' ? { autoComplete: 'off' } : {})}
            disabled={disabled}
            required={required}
          />
          {rightText && <span className="custom-input__text">{rightText}</span>}
        </span>
      </label>
    </div>
  );
};

export default CustomInput;
