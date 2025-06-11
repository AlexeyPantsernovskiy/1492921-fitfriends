import { JSX, useState } from 'react';
import { CustomToggle } from '@frontend/components';

type CustomToggleListProps<T extends Record<string, string> | string[]> = {
  classPrefix: string;
  name: string;
  caption: string;
  items: T;
  value: T extends string[] ? string[] : Extract<keyof T, string>[];
  disabled?: boolean;
  visibleItemsLimit?: number;
  onChange: (
    selectedItems: T extends string[] ? string[] : Extract<keyof T, string>[]
  ) => void;
};

const CustomToggleList = <T extends Record<string, string> | string[]>({
  classPrefix,
  name,
  caption,
  items,
  value,
  disabled = false,
  visibleItemsLimit,
  onChange,
}: CustomToggleListProps<T>): JSX.Element => {
  const normalizedItems = Array.isArray(items)
    ? Object.fromEntries(items.map((item) => [item, item]))
    : items;
  const itemEntries = Object.entries(normalizedItems);
  const hasMoreItems =
    itemEntries.length > (visibleItemsLimit ?? itemEntries.length);
  const [showAll, setShowAll] = useState(!hasMoreItems);
  const visibleItems = showAll
    ? itemEntries
    : itemEntries.slice(0, visibleItemsLimit);

  const handleToggleChange = (key: string) => {
    const currentValue = value as string[];
    const updateValue = currentValue.includes(key)
      ? currentValue.filter((item) => item !== key)
      : [...currentValue, key];

    onChange(
      updateValue as T extends string[] ? string[] : Extract<keyof T, string>[]
    );
  };

  const handleButtonMoreClick = () => {
    setShowAll(!showAll);
  };

  return (
    <div
      className={`${classPrefix}-form__block ${classPrefix}-form__block--${name}`}
    >
      <h4 className={`${classPrefix}-form__block-title`}>{caption}</h4>
      <ul className={`${classPrefix}-form__check-list`}>
        {visibleItems.map(([key, itemValue]) => (
          <li className={`${classPrefix}-form__check-list-item`} key={key}>
            <CustomToggle
              name={name}
              caption={itemValue as string}
              value={key}
              checked={(value as string[]).includes(key)}
              disabled={disabled}
              onChange={() => handleToggleChange(key)}
            />
          </li>
        ))}
      </ul>
      {hasMoreItems && (
        <button
          className="btn-show-more user-catalog-form__btn-show"
          type="button"
          onClick={handleButtonMoreClick}
        >
          <span>{showAll ? 'Свернуть' : 'Посмотреть все'}</span>
          <svg
            className="btn-show-more__icon"
            width="10"
            height="4"
            aria-hidden="true"
            style={{ transform: showAll ? 'rotate(180deg)' : 'none' }}
          >
            <use xlinkHref="#arrow-down"></use>
          </svg>
        </button>
      )}
    </div>
  );
};

export default CustomToggleList;
