import { FormEvent, JSX, useState } from 'react';

import {
  Logo,
  FilledButton,
  CustomToggleRadio,
  CustomInput,
  ChecklistButton,
} from '@frontend/components';
import { ToggleRadioCaptionSize } from '@frontend/types/component';
import {
  Level,
  Questionnaire,
  Specialization,
  Duration,
  UserLimit,
  LevelName,
  DurationName,
} from '@project/shared';
import { fillUserQuestionnaire } from '@frontend/store';
import { useAppDispatch } from '@frontend/src/hooks';
import history from '@frontend/src/history';
import { AppRoute } from '@frontend/const';

type InputCaloriesProps = {
  name: string;
  caption: string;
};

const InputCalories = ({ name, caption }: InputCaloriesProps): JSX.Element => {
  return (
    <div className={`questionnaire-user__${name}`}>
      <span className="questionnaire-user__legend">{caption}</span>
      <CustomInput
        classPrefix="questionnaire-user"
        type="number"
        caption={''}
        name={name}
        rightText="ккал"
        min={1}
      />
    </div>
  );
};

const QuestionnaireUser = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [specialization, setSpecialization] = useState<Specialization[]>([]);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      specialization.length < UserLimit.Specialization.MinCount ||
      specialization.length > UserLimit.Specialization.MaxCount
    ) {
      const specializationFields = e.currentTarget.querySelector(
        '[name="specialization"]'
      ) as HTMLInputElement;
      specializationFields.setCustomValidity(
        `Необходимо выбрать от ${UserLimit.Specialization.MinCount} до ${UserLimit.Specialization.MaxCount} типов тренировок`
      );
      specializationFields.reportValidity();
      return;
    }

    const formData = new FormData(e.currentTarget);
    const questionnaire: Questionnaire = {
      specialization: specialization as Specialization[],
      duration: (formData.get('Duration')?.toString() || '') as Duration,
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
    try {
      await dispatch(fillUserQuestionnaire(questionnaire)).unwrap();
      history.push(AppRoute.Main);
    } catch (error) {
      throw new Error(`Ошибка при сохранении опросника: ${error}`);
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
                      <ChecklistButton
                        classPrefix="questionnaire-user"
                        name="specialization"
                        items={Specialization}
                        value={specialization}
                        onChange={setSpecialization}
                      />
                    </div>
                    <CustomToggleRadio
                      classPrefix="questionnaire-user"
                      name="Duration"
                      caption="Сколько времени вы готовы уделять на тренировку в день"
                      items={DurationName}
                      captionSize={ToggleRadioCaptionSize.Big}
                    />
                    <CustomToggleRadio
                      classPrefix="questionnaire-user"
                      name="level"
                      caption="Ваш уровень"
                      items={LevelName}
                      captionSize={ToggleRadioCaptionSize.Big}
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
                  <FilledButton classPrefix="questionnaire-user" />
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
