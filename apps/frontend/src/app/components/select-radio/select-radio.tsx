import { JSX } from 'react';

export enum VariantCaption {
  BigCaption = 'big_caption',
  Normal = 'normal',
}

type SelectRadioProps = {
  classPrefix: string;
  name: string;
  items: string[] | readonly string[];
  caption: string;
  value?: string;
  variant?: VariantCaption;
};

const SelectRadio = ({
  classPrefix,
  name,
  items,
  caption,
  value,
  variant = VariantCaption.Normal,
}: SelectRadioProps): JSX.Element => {
  return (
    <div
      className={
        variant === VariantCaption.Normal
          ? `${classPrefix}__radio`
          : `${classPrefix}__block`
      }
    >
      <span
        className={
          variant === VariantCaption.Normal
            ? `${classPrefix}__label`
            : `${classPrefix}__legend`
        }
      >
        {caption}
      </span>
      <div
        className={`custom-toggle-radio custom-toggle-radio--big ${variant === VariantCaption.Normal ? '' : `${classPrefix}__radio`}`}
      >
        {items.map((item) => (
          <div className="custom-toggle-radio__block">
            <label>
              <input
                type="radio"
                name={name}
                value={item}
                defaultChecked={value === item}
                required
              />
              <span className="custom-toggle-radio__icon"></span>
              <span className="custom-toggle-radio__label">{item}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectRadio;
