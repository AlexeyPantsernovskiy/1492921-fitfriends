import { ChangeEvent, useEffect, useState } from 'react';

import {
  Specialization,
  UserRole,
  UserCatalogQuery,
  LOCATIONS,
  LevelName,
  Level,
} from '@project/shared';
import { CustomToggleList } from '@frontend/components';
import { Limits } from '@frontend/const';
import { FormField } from '@frontend/types/component';

type RoleValue = UserRole | null;
type LevelValue = Level | null;

type UserRoleElementProps = {
  caption: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function UserRoleElement({
  caption,
  checked,
  onChange,
}: UserRoleElementProps): JSX.Element {
  return (
    <label>
      <input
        type="radio"
        name="role"
        defaultChecked={checked}
        onChange={onChange}
      />
      <span className="btn-radio-sort__label">{caption}</span>
    </label>
  );
}

type UserRoleListProps = {
  value: RoleValue;
  onChange: (value: RoleValue) => void;
};

function UserRoleList({ value, onChange }: UserRoleListProps): JSX.Element {
  return (
    <div className="user-catalog-form__block">
      <h3 className="user-catalog-form__title user-catalog-form__title--sort">
        Сортировка
      </h3>
      <div className="btn-radio-sort">
        <UserRoleElement
          caption="Тренеры"
          checked={value === UserRole.Coach}
          onChange={() => onChange(UserRole.Coach)}
        />
        <UserRoleElement
          caption="Пользователи"
          checked={value === UserRole.Sportsman}
          onChange={() => onChange(UserRole.Sportsman)}
        />
      </div>
    </div>
  );
}

interface UserCatalogFilterProps {
  handleFilterApply(query: UserCatalogQuery): void;
}

function UserCatalogFilter({
  handleFilterApply,
}: UserCatalogFilterProps): JSX.Element {
  const [locations, setLocations] = useState<string[]>([]);
  const [specializations, setSpecialization] = useState<Specialization[]>([]);
  const [level, setLevel] = useState<LevelValue>(null);
  const [role, setUserRole] = useState<RoleValue>(null);

  useEffect(() => {
    const filter: UserCatalogQuery = {
      locations,
      specializations,
      page: 1,
    };
    if (level) {
      filter.level = level;
    }
    if (role) {
      filter.role = role;
    }
    handleFilterApply(filter);
  }, [locations, specializations, level, role, handleFilterApply]);

  const handleUserRoleChange = (value: RoleValue) => {
    setUserRole(value);
  };

  return (
    <form className="user-catalog-form__form">
      <CustomToggleList
        classPrefix="user-catalog"
        name="location"
        caption="Локация, станция метро"
        items={LOCATIONS}
        value={locations}
        visibleItemsLimit={Limits.ToggleListItems}
        onChange={setLocations}
      />
      <CustomToggleList
        classPrefix="user-catalog"
        name="spezialization"
        caption="Специализация"
        items={Specialization}
        value={specializations}
        visibleItemsLimit={Limits.ToggleListItems}
        onChange={setSpecialization}
      />
      <div className="user-catalog-form__block user-catalog-form__block--level">
        <h4 className="user-catalog-form__block-title">Ваш уровень</h4>
        <div className="custom-toggle-radio">
          {Object.entries(LevelName).map(([key, item]) => (
            <div className="custom-toggle-radio__block" key={key}>
              <label>
                <input
                  type="radio"
                  name="level"
                  value={key}
                  defaultChecked={level === key}
                  required
                  onChange={() => setLevel(key as Level)}
                />
                <span className="custom-toggle-radio__icon"></span>
                <span className="custom-toggle-radio__label">{item}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      <UserRoleList value={role} onChange={handleUserRoleChange} />
    </form>
  );
}

export default UserCatalogFilter;
