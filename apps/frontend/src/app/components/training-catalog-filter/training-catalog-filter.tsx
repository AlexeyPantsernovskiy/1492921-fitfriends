import { ChangeEvent, useEffect, useState } from 'react';

import {
  TrainingProperty,
  SortDirection,
  TrainingQuery,
  SortType,
  Specialization,
} from '@project/shared';
import { useAppSelector } from '@frontend/src/hooks';
import { trainingSelectors } from '@frontend/store';

import { InputRange, SliderRange } from '@frontend/components';
import { RangeValue } from '@frontend/types/types';

type SortValue = SortDirection | null;

export type SpecializationCheckBoxProps = {
  caption: string;
  value: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function SpecializationCheckBox({
  caption,
  value,
  checked,
  onChange,
}: SpecializationCheckBoxProps): JSX.Element {
  return (
    <div className="custom-toggle custom-toggle--checkbox">
      <label>
        <input
          type="checkbox"
          name="type"
          value={value}
          defaultChecked={checked}
          onChange={onChange}
        />
        <span className="custom-toggle__icon">
          <svg width="9" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-check"></use>
          </svg>
        </span>
        <span className="custom-toggle__label">{caption}</span>
      </label>
    </div>
  );
}

type SpecializationCheckListProps = {
  value: Specialization[];
  onChange: (selectedItems: Specialization[]) => void;
};

function SpecializationCheckList({
  value,
  onChange,
}: SpecializationCheckListProps): JSX.Element {
  const handleTypeChange = (key: Specialization) => {
    const updateValue = value.includes(key)
      ? value.filter((item) => item !== key)
      : [...value, key];
    onChange(updateValue);
  };

  return (
    <div className="gym-catalog-form__block gym-catalog-form__block--type">
      <h4 className="gym-catalog-form__block-title">Тип</h4>
      <ul className="gym-catalog-form__check-list">
        {Object.entries(Specialization).map(([key, item]) => (
          <li className="gym-catalog-form__check-list-item" key={key}>
            <SpecializationCheckBox
              caption={item}
              value={key}
              checked={value.includes(key as Specialization)}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleTypeChange(key as Specialization)
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

type SortElementListProps = {
  value: SortValue;
  onChange: (value: SortValue) => void;
};

function SortElementList({
  value,
  onChange,
}: SortElementListProps): JSX.Element {
  return (
    <div className="gym-catalog-form__block gym-catalog-form__block--sort">
      <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">
        Сортировка
      </h4>
      <div className="btn-radio-sort gym-catalog-form__radio">
        <SortElement
          caption="Дешевле"
          checked={value === SortDirection.Asc}
          onChange={() => onChange(SortDirection.Asc)}
        />
        <SortElement
          caption="Дороже"
          checked={value === SortDirection.Desc}
          onChange={() => onChange(SortDirection.Desc)}
        />
        <SortElement
          caption="Бесплатные"
          checked={value === null}
          onChange={() => onChange(null)}
        />
      </div>
    </div>
  );
}

type SortElementProps = {
  caption: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function SortElement({
  caption,
  checked,
  onChange,
}: SortElementProps): JSX.Element {
  return (
    <label>
      <input
        type="radio"
        name="sort"
        defaultChecked={checked}
        onChange={onChange}
      />
      <span className="btn-radio-sort__label">{caption}</span>
    </label>
  );
}

interface TrainingCatalogFilterProps {
  handleFilterApply(query: TrainingQuery): void;
}

function TrainingCatalogFilter({
  handleFilterApply,
}: TrainingCatalogFilterProps): JSX.Element {
  const maxPriceTraining = useAppSelector(trainingSelectors.maxPrice);

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
  const [specialization, setSpecialization] = useState<Specialization[]>([]);
  const [sortDirection, SetSortDirection] = useState<SortDirection | null>(
    SortDirection.Asc
  );

  useEffect(() => {
    handleFilterApply({
      minPrice: sortDirection ? priceRange.min : 0,
      maxPrice: sortDirection ? priceRange.max : 0,
      minCalories: caloriesRange.min,
      maxCalories: caloriesRange.max,
      minRating: ratingRange.min,
      maxRating: ratingRange.max,
      specializations: specialization,
      sortDirection: sortDirection ?? SortDirection.Desc,
      sortBy: sortDirection ? SortType.Price : SortType.Date,
      page: 1,
    });
  }, [
    priceRange,
    caloriesRange,
    ratingRange,
    specialization,
    sortDirection,
    handleFilterApply,
  ]);

  const handleSortChange = (value: SortValue) => {
    SetSortDirection(value);
    // if (minPriceInput.current) {
    //   setMinPrice(Number(minPriceInput.current.value));
    // }
    // if (maxPriceInput.current) {
    //   setMaxPrice(Number(maxPriceInput.current.value));
    // }
  };

  return (
    <form className="gym-catalog-form__form">
      <InputRange
        caption="Цена, ₽"
        classNameSlider="filter-range"
        rangeName="price"
        maxRangeValue={maxPriceTraining}
        minValue={priceRange.min}
        maxValue={priceRange.max}
        onChange={setPriceRange}
      />
      <InputRange
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
      <div className="gym-catalog-form__block gym-catalog-form__block--rating">
        <h4 className="gym-catalog-form__block-title">Рейтинг</h4>
        <SliderRange
          className="filter-raiting"
          minRangeValue={TrainingProperty.Rating.Validate.Min}
          maxRangeValue={TrainingProperty.Rating.Validate.Max}
          isShowValues={true}
          onChange={setRatingRange}
        />
      </div>
      <SpecializationCheckList
        value={specialization}
        onChange={setSpecialization}
      />
      <SortElementList value={sortDirection} onChange={handleSortChange} />
    </form>
  );
}

export default TrainingCatalogFilter;
