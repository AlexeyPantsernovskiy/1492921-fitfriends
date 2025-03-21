import { ChangeEvent, JSX } from 'react';

import { CheckboxButton } from '@frontend/components';

type ChecklistButtonProps<T extends object> = {
  classPrefix: string;
  name: string;
  items: T;
  value: (keyof T)[];
  disabled?: boolean;
  onChange: (selectedItems: (keyof T)[]) => void;
};

const ChecklistButton = <T extends object>({
  classPrefix,
  name,
  items,
  value,
  disabled = false,
  onChange,
}: ChecklistButtonProps<T>): JSX.Element => {
  const handleChange = (key: keyof T) => {
    const updateValue = value.includes(key)
      ? value.filter((item) => item !== key)
      : [...value, key];
    onChange(updateValue);
    // Очистка сообщения об ошибке
    if (updateValue.length > 0) {
      const checkboxes = document.querySelectorAll<HTMLInputElement>(
        `[name="${name}"]`
      );
      checkboxes.forEach((checkbox) => checkbox.setCustomValidity(''));
    }
  };

  return (
    <div className={`${name}-checkbox ${classPrefix}__${name}`}>
      {Object.entries(items).map(([key, item]) => (
        <CheckboxButton
          key={key}
          name={name}
          caption={item}
          value={key}
          checked={value.includes(key as keyof T)}
          disabled={disabled}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange(key as keyof T)
          }
        />
      ))}
    </div>
  );
};

export default ChecklistButton;
