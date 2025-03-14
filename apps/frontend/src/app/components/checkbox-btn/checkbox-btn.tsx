import { ChangeEvent, JSX } from 'react';

export type CheckboxBtnProps = {
  name: string;
  caption: string | JSX.Element;
  value: string;
  isChecked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const CheckboxBtn = ({
  name,
  caption,
  value,
  isChecked = false,
  onChange,
}: CheckboxBtnProps): JSX.Element => {
  return (
    <div className="btn-checkbox">
      <label>
        <input
          className="visually-hidden"
          type="checkbox"
          name={name}
          value={value}
          defaultChecked={isChecked}
          onChange={onChange}
        />
        <span className="btn-checkbox__btn">{caption}</span>
      </label>
    </div>
  );
};

export default CheckboxBtn;
