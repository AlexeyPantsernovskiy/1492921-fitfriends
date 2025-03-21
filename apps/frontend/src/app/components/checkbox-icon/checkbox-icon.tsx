import { JSX } from 'react';

export type CheckboxIconProps = {
  classPrefix: string;
  name: string;
  caption: string | JSX.Element;
  value: string;
  checked: boolean;
};

const CheckboxIcon = ({
  classPrefix,
  name,
  caption,
  value,
  checked,
}: CheckboxIconProps): JSX.Element => {
  return (
    <div className={`${classPrefix}__checkbox`}>
      <label>
        <input
          type="checkbox"
          value={value}
          name={name}
          defaultChecked={checked}
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

export default CheckboxIcon;
