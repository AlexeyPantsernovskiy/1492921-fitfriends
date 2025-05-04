import { useEffect, useState } from 'react';

import {
  TrainingProperty,
  SortDirection,
  TrainingQuery,
  SortType,
  Duration,
  DurationName,
} from '@project/shared';
import { useAppSelector } from '@frontend/src/hooks';
import { trainingSelectors, userSelectors } from '@frontend/store';

import { CustomToggleList, InputRange } from '@frontend/components';
import { RangeValue } from '@frontend/types/types';

interface MyTrainingFilterProps {
  handleFilterApply(query: TrainingQuery): void;
}

function MyTrainingFilter({
  handleFilterApply,
}: MyTrainingFilterProps): JSX.Element {
  const maxPriceTraining = useAppSelector(trainingSelectors.maxPrice);
  const user = useAppSelector(userSelectors.user);

  const [priceRange, setPriceRange] = useState<RangeValue>({
    min: 0,
    max: maxPriceTraining,
  });
  const [caloriesRange, setCaloriesRange] = useState<RangeValue>({
    min: TrainingProperty.Calories.Validate.Min,
    max: TrainingProperty.Calories.Validate.Max,
  });
  const [ratingRange, setRatingRange] = useState<RangeValue>({
    min: TrainingProperty.Rating.Validate.Min,
    max: TrainingProperty.Rating.Validate.Max,
  });
  const [durations, setDurations] = useState<Duration[]>([]);

  useEffect(() => {
    handleFilterApply({
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      minCalories: caloriesRange.min,
      maxCalories: caloriesRange.max,
      minRating: ratingRange.min,
      maxRating: ratingRange.max,
      durations: durations,
      coachId: user?.id,
      sortDirection: SortDirection.Desc,
      sortBy: SortType.Date,
      page: 1,
    });
  }, [
    priceRange,
    caloriesRange,
    ratingRange,
    durations,
    user,
    handleFilterApply,
  ]);

  return (
    <form className="my-training-form__form">
      <InputRange
        classPrefix="my-training"
        caption="Цена, ₽"
        classNameSlider="filter-range"
        rangeName="price"
        maxRangeValue={maxPriceTraining}
        minValue={priceRange.min}
        maxValue={priceRange.max}
        onChange={setPriceRange}
      />
      <InputRange
        classPrefix="my-training"
        caption="Калории"
        classNameSlider="filter-range"
        rangeName="calories"
        namePostfix="cal"
        minRangeValue={TrainingProperty.Calories.Validate.Min}
        maxRangeValue={TrainingProperty.Calories.Validate.Max}
        minValue={caloriesRange.min}
        maxValue={caloriesRange.max}
        step={100}
        onChange={setCaloriesRange}
      />
      <InputRange
        classPrefix="my-training"
        classNameSlider="filter-raiting"
        caption="Рейтинг"
        rangeName="rating"
        minRangeValue={TrainingProperty.Rating.Validate.Min}
        maxRangeValue={TrainingProperty.Rating.Validate.Max}
        step={1}
        isOnlySlider={true}
        onChange={setRatingRange}
      />
      <CustomToggleList
        classPrefix="my-training"
        name="duration"
        caption="Длительность"
        items={DurationName}
        value={durations}
        onChange={setDurations}
      />
    </form>
  );
}

export default MyTrainingFilter;
