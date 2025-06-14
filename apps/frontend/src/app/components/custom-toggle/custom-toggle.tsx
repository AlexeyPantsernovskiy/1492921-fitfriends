import { ChangeEvent, JSX } from 'react';

type CustomToggleProps = {
  name: string;
  caption: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const CustomToggle = ({
  name,
  caption,
  value,
  checked = true,
  disabled = false,
  onChange,
}: CustomToggleProps): JSX.Element => {
  return (
    <div className="custom-toggle custom-toggle--checkbox">
      <label>
        <input
          type="checkbox"
          name={name}
          value={value}
          defaultChecked={checked}
          disabled={disabled}
          onChange={onChange}
        />
        <span className="custom-toggle__icon">
          <svg width="9" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-check"></use>
          </svg>
        </span>
        <span className="custom-toggle__label">{caption}</span>
      </label>
    </div>
  );
};

export default CustomToggle;
