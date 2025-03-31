import { JSX, useState } from 'react';
import classNames from 'classnames';

export type CustomSelectProps = {
  items: object | string[] | readonly string[];
  caption: string;
  value: string;
  disabled?: boolean;
  prefixCaption?: string;
  addClassNames?: string;
  onSelect: (value: string) => void;
};

const CustomSelect = ({
  items,
  caption,
  value,
  disabled = false,
  prefixCaption,
  addClassNames,
  onSelect,
}: CustomSelectProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleList = () => {
    setIsOpen(!isOpen);
  };
  const handleSelectItem = (item: string) => {
    onSelect(item);
    setIsOpen(false);
  };

  const itemsList = Array.isArray(items)
    ? Object.fromEntries(items.map((item) => [item, item]))
    : items;

  const displayValue = value ? itemsList[value] : '';

  return (
    <div
      className={classNames('custom-select', {
        'custom-select--not-selected': !value,
        'is-open': isOpen,
        'custom-select--readonly': disabled,
        [`${addClassNames}__select`]: addClassNames && disabled,
        [`${addClassNames}-edit__select`]: addClassNames && !disabled,
      })}
    >
      <span className="custom-select__label" style={{ opacity: 1 }}>
        {caption}
      </span>
      <div className="custom-select__placeholder">
        {value && prefixCaption}
        {displayValue}
      </div>
      <button
        className="custom-select__button"
        type="button"
        aria-label="Выберите один из вариантов"
        onClick={handleToggleList}
        disabled={disabled}
      >
        <span className="custom-select__text" style={{ fontSize: '100%' }}>
          {value && prefixCaption}
          {displayValue}
        </span>

        <span className="custom-select__icon">
          <svg width="15" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-down"></use>
          </svg>
        </span>
      </button>
      {isOpen && (
        <ul className="custom-select__list" role="listbox">
          {Object.entries(itemsList).map(([key, item]) => (
            <li
              key={key}
              className="custom-select__item"
              role="option"
              aria-selected={value === key}
              onClick={() => handleSelectItem(key)}
            >
              {prefixCaption}
              {item as string}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
