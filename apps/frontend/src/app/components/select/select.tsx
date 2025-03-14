import { JSX, useState } from 'react';

export type SelectProps = {
  items: string[];
  caption: string;
  value: string;
  prefixCaption?: string;
  onSelect: (value: string) => void;
};

const Select = ({
  items,
  caption,
  value,
  prefixCaption,
  onSelect,
}: SelectProps): JSX.Element => {
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
      className={`custom-select ${!value ? 'custom-select--not-selected' : ''} ${isOpen ? 'is-open' : ''} ${value ? 'not-empty' : ''}`}
    >
      <span className="custom-select__label" style={{ opacity: 1 }}>
        {caption}
      </span>
      <button
        className="custom-select__button"
        type="button"
        aria-label="Выберите один из вариантов"
        onClick={handleToggleList}
      >
        <span className="custom-select__text" style={{ fontSize: '100%' }}>
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

export default Select;
