import { ChangeEvent, JSX } from 'react';
import { CustomToggle } from '@frontend/components';

type CustomToggleListProps<T extends object> = {
  classPrefix: string;
  name: string;
  caption: string;
  items: T;
  value: (keyof T)[];
  disabled?: boolean;
  onChange: (selectedItems: (keyof T)[]) => void;
};

const CustomToggleList = <T extends object>({
  classPrefix,
  name,
  caption,
  items,
  value,
  disabled = false,
  onChange,
}: CustomToggleListProps<T>): JSX.Element => {
  const handleToggleChange = (key: keyof T) => {
    const updateValue = value.includes(key)
      ? value.filter((item) => item !== key)
      : [...value, key];
    onChange(updateValue);
  };

  return (
    <div
      className={`${classPrefix}-form__block ${classPrefix}-form__block--${name}`}
    >
      <h4 className={`${classPrefix}-form__block-title`}>{caption}</h4>
      <ul className={`${classPrefix}-form__check-list`}>
        {Object.entries(items).map(([key, item]) => (
          <li className={`${classPrefix}-form__check-list-item`} key={key}>
            <CustomToggle
              name={name}
              caption={item}
              value={key}
              checked={value.includes(key as keyof T)}
              disabled={disabled}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleToggleChange(key as keyof T)
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomToggleList;
