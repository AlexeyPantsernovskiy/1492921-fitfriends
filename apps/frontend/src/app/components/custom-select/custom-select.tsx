import { JSX, useState } from 'react';
import classNames from 'classnames';

export type CustomSelectProps = {
  items: string[] | readonly string[];
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
  const handleSelectLocation = (item: string) => {
    onSelect(item);
    setIsOpen(false);
  };

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
        {value}
      </div>
      <button
        className="custom-select__button"
        type="button"
        aria-label="Выберите один из вариантов"
        onClick={handleToggleList}
        disabled={disabled}
      >
        <span className="custom-select__text" style={{ fontSize: '100%' }}>
          {prefixCaption}
          {value}
        </span>

        <span className="custom-select__icon">
          <svg width="15" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-down"></use>
          </svg>
        </span>
      </button>
      {isOpen && (
        <ul className="custom-select__list" role="listbox">
          {items.map((item) => (
            <li
              key={item}
              className="custom-select__item"
              role="option"
              aria-selected={value === item}
              onClick={() => handleSelectLocation(item)}
            >
              {prefixCaption}
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
