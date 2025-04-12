import { useState, useEffect, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import SliderRange from '../slider-range/slider-range';
import { RangeValue, ToggleMinMax } from '@frontend/types/types';
import { ToggleRange } from '@frontend/const';

const DEBOUNCE_TIME = 500;
const STEPS = 50;

export type InputRangeProps = {
  caption: string;
  classNameSlider: string;
  rangeName: string;
  namePostfix?: string;
  minRangeValue?: number;
  maxRangeValue: number;
  minValue?: number;
  maxValue?: number;
  step?: number;
  onChange: (values: RangeValue) => void;
};

function InputRange({
  caption,
  classNameSlider,
  rangeName,
  namePostfix = '',
  minRangeValue = 0,
  maxRangeValue,
  minValue = minRangeValue,
  maxValue = maxRangeValue,
  step,
  onChange,
}: InputRangeProps) {
  // Состояния для отображения в input
  const [displayMin, setDisplayMin] = useState(String(minValue));
  const [displayMax, setDisplayMax] = useState(String(maxValue));

  // Автоматический расчет шага для слайдера, если не указан
  const sliderStep =
    step ?? Math.max(1, Math.floor((maxRangeValue - minRangeValue) / STEPS));

  // Дебаунс для onChange
  const debouncedOnChange = useDebouncedCallback(
    (values: RangeValue) => onChange(values),
    DEBOUNCE_TIME
  );

  // Синхронизация с внешними изменениями
  useEffect(() => {
    setDisplayMin(String(minValue));
    setDisplayMax(String(maxValue));
  }, [minValue, maxValue]);

  // Функция для строгой валидации значений
  const validateValues = useCallback(
    (min: number, max: number) => {
      let validMin = Math.max(
        minRangeValue,
        Math.min(min, maxRangeValue - sliderStep)
      );
      let validMax = Math.min(
        maxRangeValue,
        Math.max(max, minRangeValue + sliderStep)
      );

      // Гарантируем min < max
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

  // Обработчик изменений в полях ввода
  const handleInputChange = useCallback(
    (type: ToggleMinMax) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (type === ToggleRange.Min) {
        setDisplayMin(value);
      } else {
        setDisplayMax(value);
      }

      // Парсим текущие значения
      const currentMin =
        type === ToggleRange.Min
          ? parseInt(value, 10)
          : parseInt(displayMin, 10);
      const currentMax =
        type === ToggleRange.Max
          ? parseInt(value, 10)
          : parseInt(displayMax, 10);

      // Если значения валидны - применяем с дебаунсом
      if (!isNaN(currentMin) && !isNaN(currentMax)) {
        const { min, max } = validateValues(currentMin, currentMax);
        debouncedOnChange({ min, max });
      }
    },
    [displayMin, displayMax, debouncedOnChange, validateValues]
  );

  // Обработчик потери фокуса
  const handleBlur = useCallback(
    (type: ToggleMinMax) => () => {
      const numValue = parseInt(
        type === ToggleRange.Min ? displayMin : displayMax,
        10
      );

      if (isNaN(numValue)) {
        // Восстанавливаем предыдущее значение
        if (type === ToggleRange.Min) {
          setDisplayMin(String(minValue));
        } else {
          setDisplayMax(String(maxValue));
        }
        return;
      }

      const currentMin =
        type === ToggleRange.Min
          ? numValue
          : parseInt(displayMin, 10) || minRangeValue;
      const currentMax =
        type === ToggleRange.Max
          ? numValue
          : parseInt(displayMax, 10) || maxRangeValue;

      const { min, max } = validateValues(currentMin, currentMax);

      // Обновляем отображаемые значения
      setDisplayMin(String(min));
      setDisplayMax(String(max));
      debouncedOnChange({ min, max });
    },
    [
      displayMin,
      displayMax,
      minRangeValue,
      maxRangeValue,
      minValue,
      maxValue,
      debouncedOnChange,
      validateValues,
    ]
  );

  // Получаем валидные значения для слайдера
  const { min: sliderMin, max: sliderMax } = validateValues(
    parseInt(displayMin, 10) || minRangeValue,
    parseInt(displayMax, 10) || maxRangeValue
  );

  const minName = `text-min-${namePostfix}`;
  const maxName = `text-max-${namePostfix}`;

  return (
    <div
      className={`gym-catalog-form__block gym-catalog-form__block--${rangeName}`}
    >
      <h4 className="gym-catalog-form__block-title">{caption}</h4>
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
            onBlur={handleBlur(ToggleRange.Min)}
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
            onBlur={handleBlur(ToggleRange.Max)}
          />
          <label htmlFor={maxName}>до</label>
        </div>
      </div>
      <SliderRange
        className={classNameSlider}
        minRangeValue={minRangeValue}
        maxRangeValue={maxRangeValue}
        minValue={sliderMin}
        maxValue={sliderMax}
        step={sliderStep}
        isShowValues={false}
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
