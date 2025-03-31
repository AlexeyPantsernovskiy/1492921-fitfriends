import { ToggleRadioCaptionSize } from '@frontend/types/component';
import classNames from 'classnames';
import { JSX } from 'react';

type ToggleRadioProps = {
  classPrefix: string;
  name: string;
  items: object;
  //items?: string[] | readonly string[];
  caption: string;
  value?: string;
  captionSize?: ToggleRadioCaptionSize;
};

const ToggleRadio = ({
  classPrefix,
  name,
  items,
  caption,
  value,
  captionSize = ToggleRadioCaptionSize.Normal,
}: ToggleRadioProps): JSX.Element => {
  return (
    <div className={`${classPrefix}__${captionSize.classDiv}`}>
      <span className={`${classPrefix}__${captionSize.classCaption}`}>
        {caption}
      </span>
      <div
        className={classNames(
          'custom-toggle-radio',
          'custom-toggle-radio--big',
          { [`${classPrefix}__radio`]: classPrefix }
        )}
      >
        {Object.entries(items).map(([key, item]) => (
          <div className="custom-toggle-radio__block">
            <label>
              <input
                type="radio"
                name={name}
                value={key}
                defaultChecked={value === key}
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

export default ToggleRadio;
