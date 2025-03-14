import { JSX } from 'react';

export type CheckboxProps = {
  classPrefix: string;
  name: string;
  caption: string | JSX.Element;
  value: string;
  isChecked: boolean;
};

const Checkbox = ({
  classPrefix,
  name,
  caption,
  value,
  isChecked,
}: CheckboxProps): JSX.Element => {
  return (
    <div className={`${classPrefix}__checkbox`}>
      <label>
        <input
          type="checkbox"
          value={value}
          name={name}
          defaultChecked={isChecked}
        />
        <span className={`${classPrefix}__checkbox-icon`}>
          <svg width="9" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-check"></use>
          </svg>
        </span>
        <span className={`${classPrefix}__checkbox-label`}>{caption}</span>
      </label>
    </div>
  );
};

export default Checkbox;
