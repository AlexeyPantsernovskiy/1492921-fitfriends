import { ChangeEvent, FormEvent, JSX, useState } from 'react';

import {
  Button,
  Logo,
  SelectRadio,
  VariantCaption,
} from '@frontend/components';
import { useAppDispatch } from '@frontend/src/hooks';

import {
  Level,
  LEVELS,
  Questionnaire,
  Specialisation,
  Time,
  TIMES,
} from '@project/shared-core';
import { CheckboxBtn } from '@frontend/components';
import { fillQuestionnaire } from '@frontend/store';
import { useParams } from 'react-router-dom';

type InputCaloriesProps = {
  name: string;
  caption: string;
};

const InputCalories = ({ name, caption }: InputCaloriesProps): JSX.Element => {
  return (
    <div className={`questionnaire-user__${name}`}>
      <span className="questionnaire-user__legend">{caption}</span>
      <div className="custom-input custom-input--with-text-right questionnaire-user__input">
        <label>
          <span className="custom-input__wrapper">
            <input type="number" name={name} required min={1} />
            <span className="custom-input__text">ккал</span>
          </span>
        </label>
      </div>
    </div>
  );
};

const QuestionnaireUser = (): JSX.Element => {
  const params = useParams();
  const { userId } = params;

  const dispatch = useAppDispatch();

  const [specialisation, setSpecialisation] = useState<string[]>([]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userId) {
      throw new Error('userId не указан в маршруте');
    }
    if (specialisation.length === 0) {
      const specialisationFields = e.currentTarget.querySelector(
        '[name="specialisation"]'
      ) as HTMLInputElement;
      specialisationFields.setCustomValidity(
        'Необходимо выбрать хотя бы одну специализацию'
      );
      specialisationFields.reportValidity();
      return;
    }

    const formData = new FormData(e.currentTarget);
    const questionnaire: Questionnaire = {
      specialisation: specialisation as Specialisation[],
      time: (formData.get('time')?.toString() || '') as Time,
      level: (formData.get('level')?.toString() || '') as Level,
      caloriesLose: parseInt(
        formData.get('calories-lose')?.toString() || '0',
        10
      ),
      caloriesWaste: parseInt(
        formData.get('calories-waste')?.toString() || '0',
        10
      ),
      isReadyToTrain: false,
    };
    dispatch(fillQuestionnaire({ userId, questionnaire }));
  };

  const handleCheckboxBtnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    if (name === 'specialisation') {
      const specialisationValue = value as Specialisation;
      setSpecialisation((prev) =>
        checked
          ? [...prev, value]
          : prev.filter((item) => item !== specialisationValue)
      );
    }
    // Очистка сообщения об ошибки
    if (checked) {
      const checkboxes = document.querySelectorAll<HTMLInputElement>(
        '[name="specialisation"]'
      );
      checkboxes.forEach((checkbox) => checkbox.setCustomValidity(''));
    }
  };

  return (
    <>
      <Logo />
      <div className="popup-form popup-form--questionnaire-user">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__form">
              <form method="get" onSubmit={handleFormSubmit}>
                <div className="questionnaire-user">
                  <h1 className="visually-hidden">Опросник</h1>
                  <div className="questionnaire-user__wrapper">
                    <div className="questionnaire-user__block">
                      <span className="questionnaire-user__legend">
                        Ваша специализация (тип) тренировок
                      </span>
                      <div className="specialization-checkbox questionnaire-user__specializations">
                        {Object.entries(Specialisation).map(([key, value]) => (
                          <CheckboxBtn
                            key={key}
                            name="specialisation"
                            caption={value}
                            value={key}
                            onChange={handleCheckboxBtnChange}
                          />
                        ))}
                      </div>
                    </div>
                    <SelectRadio
                      classPrefix="questionnaire-user"
                      name="time"
                      caption="Сколько времени вы готовы уделять на тренировку в день"
                      items={TIMES}
                      variant={VariantCaption.BigCaption}
                    />
                    <SelectRadio
                      classPrefix="questionnaire-user"
                      name="level"
                      caption="Ваш уровень"
                      items={LEVELS}
                      variant={VariantCaption.BigCaption}
                    />
                    <div className="questionnaire-user__block">
                      <InputCalories
                        name="calories-lose"
                        caption="Сколько калорий хотите сбросить"
                      />
                      <InputCalories
                        name="calories-waste"
                        caption="Сколько калорий тратить в день"
                      />
                    </div>
                  </div>
                  <Button classPrefix="questionnaire-user" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionnaireUser;
