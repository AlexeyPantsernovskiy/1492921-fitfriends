import { useState, useEffect, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import SliderRange from '../slider-range/slider-range';
import { RangeValue, ToggleMinMax } from '@frontend/types/types';
import { ToggleRange } from '@frontend/const';

const DEBOUNCE_TIME = 500;
const STEPS_COUNT = 50;

export type InputRangeProps = {
  classPrefix: string;
  caption: string;
  classNameSlider: string;
  rangeName: string;
  namePostfix?: string;
  minRangeValue?: number;
  maxRangeValue: number;
  minValue?: number;
  maxValue?: number;
  step?: number;
  isOnlySlider?: boolean;
  onChange: (values: RangeValue) => void;
};

function InputRange({
  classPrefix,
  caption,
  classNameSlider,
  rangeName,
  namePostfix = '',
  minRangeValue = 0,
  maxRangeValue,
  minValue = minRangeValue,
  maxValue = maxRangeValue,
  step,
  isOnlySlider = false,
  onChange,
}: InputRangeProps) {
  const [displayMin, setDisplayMin] = useState(String(minValue));
  const [displayMax, setDisplayMax] = useState(String(maxValue));
  const [isEditing, setIsEditing] = useState(false);

  const sliderStep =
    step ??
    Math.max(1, Math.floor((maxRangeValue - minRangeValue) / STEPS_COUNT));

  const debouncedOnChange = useDebouncedCallback(
    (values: RangeValue) => onChange(values),
    DEBOUNCE_TIME
  );

  useEffect(() => {
    if (!isEditing) {
      setDisplayMin(String(minValue));
      setDisplayMax(String(maxValue));
    }
  }, [minValue, maxValue, isEditing]);

  const validateValues = useCallback(
    (min: number, max: number) => {
      let validMin = Math.max(minRangeValue, Math.min(min, maxRangeValue));
      let validMax = Math.min(maxRangeValue, Math.max(max, minRangeValue));

      if (validMin >= validMax) {
        if (min < maxRangeValue) {
          validMax = Math.min(validMin + sliderStep, maxRangeValue);
        } else {
          validMin = Math.max(validMax - sliderStep, minRangeValue);
        }
      }

      return { min: validMin, max: validMax };
    },
    [minRangeValue, maxRangeValue, sliderStep]
  );

  const handleInputChange = useCallback(
    (type: ToggleMinMax) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (type === ToggleRange.Min) {
        setDisplayMin(value);
      } else {
        setDisplayMax(value);
      }
      setIsEditing(true);
    },
    []
  );

  const handleBlur = useCallback(() => {
    const numMin = parseInt(displayMin, 10);
    const numMax = parseInt(displayMax, 10);

    const validated = validateValues(
      isNaN(numMin) ? minRangeValue : numMin,
      isNaN(numMax) ? maxRangeValue : numMax
    );

    setDisplayMin(String(validated.min));
    setDisplayMax(String(validated.max));
    setIsEditing(false);
    debouncedOnChange(validated);
  }, [
    displayMin,
    displayMax,
    minRangeValue,
    maxRangeValue,
    validateValues,
    debouncedOnChange,
  ]);

  const { min: sliderMin, max: sliderMax } = validateValues(
    parseInt(displayMin, 10) || minRangeValue,
    parseInt(displayMax, 10) || maxRangeValue
  );

  const minName = `text-min-${namePostfix}`;
  const maxName = `text-max-${namePostfix}`;

  return (
    <div
      className={`${classPrefix}-form__block ${classPrefix}-form__block--${rangeName}`}
    >
      <h4 className={`${classPrefix}-form__block-title`}>{caption}</h4>
      {!isOnlySlider && (
        <div className={`filter-${rangeName}`}>
          <div
            className={`filter-${rangeName}__input-text filter-${rangeName}__input-text--min`}
          >
            <input
              type="number"
              id={minName}
              name={minName}
              value={displayMin}
              onChange={handleInputChange(ToggleRange.Min)}
              onBlur={handleBlur}
              onFocus={() => setIsEditing(true)}
            />
            <label htmlFor={minName}>от</label>
          </div>
          <div
            className={`filter-${rangeName}__input-text filter-${rangeName}__input-text--max`}
          >
            <input
              type="number"
              id={maxName}
              name={maxName}
              value={displayMax}
              onChange={handleInputChange(ToggleRange.Max)}
              onBlur={handleBlur}
              onFocus={() => setIsEditing(true)}
            />
            <label htmlFor={maxName}>до</label>
          </div>
        </div>
      )}
      <SliderRange
        className={classNameSlider}
        minRangeValue={minRangeValue}
        maxRangeValue={maxRangeValue}
        minValue={sliderMin}
        maxValue={sliderMax}
        step={sliderStep}
        isShowValues={isOnlySlider}
        onChange={({ min, max }) => {
          const { min: validMin, max: validMax } = validateValues(min, max);
          setDisplayMin(String(validMin));
          setDisplayMax(String(validMax));
          debouncedOnChange({ min: validMin, max: validMax });
        }}
      />
    </div>
  );
}

export default InputRange;
