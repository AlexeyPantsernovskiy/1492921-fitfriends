import { ToggleRange } from '@frontend/const';
import { RangeValue, ToggleMinMax } from '@frontend/types/types';
import {
  MouseEvent as ReactMouseEvent,
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
} from 'react';

type SliderRangeProps = {
  className: string;
  minRangeValue?: number;
  maxRangeValue: number;
  minValue?: number;
  maxValue?: number;
  step?: number;
  isShowValues?: boolean;
  onChange: (values: RangeValue) => void;
};

function SliderRange({
  className,
  minRangeValue = 0,
  maxRangeValue,
  minValue = minRangeValue,
  maxValue = maxRangeValue,
  step = 1,
  isShowValues = false,
  onChange,
}: SliderRangeProps) {
  const [currentMin, setCurrentMin] = useState(minValue);
  const [currentMax, setCurrentMax] = useState(maxValue);
  const [activeDragging, setActiveDragging] = useState<ToggleMinMax | null>(
    null
  );
  const [minPos, setMinPos] = useState(0);
  const [maxPos, setMaxPos] = useState(0);
  const scaleRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef({ currentMin, currentMax });

  // Синхронизация с внешними изменениями
  useEffect(() => {
    setCurrentMin(minValue);
  }, [minValue]);

  useEffect(() => {
    setCurrentMax(maxValue);
  }, [maxValue]);

  // Пересчитываем позиции после монтирования и при изменении значений
  useLayoutEffect(() => {
    if (!scaleRef.current) {
      return;
    }
    const calculatePosition = (value: number) => {
      const scaleWidth = scaleRef.current?.offsetWidth || 0;
      return (
        ((value - minRangeValue) / (maxRangeValue - minRangeValue)) * scaleWidth
      );
    };

    const newMinPos = calculatePosition(currentMin);
    const newMaxPos = calculatePosition(currentMax);
    setMinPos(newMinPos);
    setMaxPos(newMaxPos);

    if (barRef.current) {
      barRef.current.style.left = `${newMinPos}px`;
      barRef.current.style.width = `${newMaxPos - newMinPos}px`;
    }
  }, [currentMin, currentMax, minRangeValue, maxRangeValue]);

  // Обработчик изменения значений
  useEffect(() => {
    const { currentMin: prevMin, currentMax: prevMax } = valuesRef.current;
    // Проверяем, изменилось ли значение (с учётом шага)
    if (currentMin !== prevMin || currentMax !== prevMax) {
      onChange({ min: currentMin, max: currentMax });
    }
  }, [currentMin, currentMax, onChange]);

  // Обновляем ref при изменении значений
  useEffect(() => {
    valuesRef.current = { currentMin, currentMax };
  }, [currentMin, currentMax]);

  const calculateValue = useCallback(
    (position: number) => {
      if (!scaleRef.current) return minRangeValue;
      const scaleWidth = scaleRef.current.offsetWidth;
      const value =
        (position / scaleWidth) * (maxRangeValue - minRangeValue) +
        minRangeValue;
      // Округляем до ближайшего шага
      const roundedValue = Math.round(value / step) * step;
      return Math.max(minRangeValue, Math.min(roundedValue, maxRangeValue));
    },
    [minRangeValue, maxRangeValue, step]
  );

  const handleMouseDown = useCallback(
    (type: ToggleMinMax) => (e: ReactMouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setActiveDragging(type);
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!activeDragging || !scaleRef.current) {
        return;
      }

      const scaleRect = scaleRef.current.getBoundingClientRect();
      let newPosition = e.clientX - scaleRect.left;
      newPosition = Math.max(0, Math.min(newPosition, scaleRect.width));

      const newValue = calculateValue(newPosition);
      const { currentMin, currentMax } = valuesRef.current;

      if (activeDragging === ToggleRange.Min) {
        const clampedValue = Math.min(newValue, currentMax - 1);
        setCurrentMin(clampedValue);
      } else {
        const clampedValue = Math.max(newValue, currentMin + 1);
        setCurrentMax(clampedValue);
      }
    },
    [activeDragging, calculateValue]
  );

  const handleMouseUp = () => {
    setActiveDragging(null);
  };

  // Добавляем/удаляем обработчики событий
  useEffect(() => {
    if (activeDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [activeDragging, currentMin, currentMax, handleMouseMove]);

  return (
    <div className={className}>
      <div
        style={{ position: 'relative' }}
        className={`${className}__scale`}
        ref={scaleRef}
      >
        <div
          style={{ position: 'absolute' }}
          className={`${className}__bar`}
          ref={barRef}
        >
          <span className="visually-hidden">Полоса прокрутки</span>
        </div>
      </div>

      <div className={`${className}__control`}>
        <button
          type="button"
          className={`${className}__min-toggle`}
          onMouseDown={handleMouseDown('min')}
          style={{ left: `${minPos}px` }}
          aria-label="Минимальное значение"
        >
          <span className="visually-hidden">Минимальное значение</span>
        </button>

        {isShowValues && (
          <span className={`${className}__value`}>{currentMin}</span>
        )}

        <button
          type="button"
          className={`${className}__max-toggle`}
          onMouseDown={handleMouseDown('max')}
          style={{ left: `${maxPos}px` }}
          aria-label="Максимальное значение"
        >
          <span className="visually-hidden">Максимальное значение</span>
        </button>

        {isShowValues && (
          <span className={`${className}__value`}>{currentMax}</span>
        )}
      </div>
    </div>
  );
}

export default SliderRange;
