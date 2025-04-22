import { JSX } from 'react';
import classNames from 'classnames';

export type CustomTextareaProps = {
  classPrefix?: string;
  name: string;
  caption?: string;
  value?: string;
  disabled?: boolean;
  required?: boolean;
};

const CustomTextarea = ({
  classPrefix,
  name,
  caption,
  value,
  disabled,
  required = true,
}: CustomTextareaProps): JSX.Element => {
  const addEditIntoClass = (disabled ?? true) ? '' : '-edit';
  const addClass = classPrefix
    ? `${classPrefix}${addEditIntoClass}__textarea`
    : '';
  return (
    <div
      className={classNames(
        'custom-textarea',
        { [addClass]: addClass },
        { 'custom-textarea--readonly': disabled }
      )}
    >
      <label>
        {caption && <span className="custom-textarea__label">{caption}</span>}
        <textarea
          name={name}
          placeholder=" "
          disabled={disabled}
          required={required}
          defaultValue={value}
        />
      </label>
    </div>
  );
};

export default CustomTextarea;
