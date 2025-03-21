import { ChangeEvent, JSX } from 'react';

export type CheckboxButtonProps = {
  name: string;
  caption: string | JSX.Element;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const CheckboxButton = ({
  name,
  caption,
  value,
  checked = false,
  disabled = false,
  onChange,
}: CheckboxButtonProps): JSX.Element => {
  return (
    <div className="btn-checkbox">
      <label>
        <input
          key={value}
          className="visually-hidden"
          type="checkbox"
          name={name}
          value={value}
          defaultChecked={checked}
          disabled={disabled}
          onChange={onChange}
        />
        <span className="btn-checkbox__btn">{caption}</span>
      </label>
    </div>
  );
};

export default CheckboxButton;
