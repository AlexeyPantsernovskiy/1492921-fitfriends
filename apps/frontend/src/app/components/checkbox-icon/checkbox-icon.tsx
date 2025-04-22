import { ChangeEvent, JSX } from 'react';

export type CheckboxIconProps = {
  classPrefix: string;
  name: string;
  caption: string | JSX.Element;
  value: string;
  checked: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const CheckboxIcon = ({
  classPrefix,
  name,
  caption,
  value,
  checked,
  onChange,
}: CheckboxIconProps): JSX.Element => {
  return (
    <div className={`${classPrefix}__checkbox`}>
      <label>
        <input
          type="checkbox"
          value={value}
          name={name}
          defaultChecked={checked}
          onChange={onChange}
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
