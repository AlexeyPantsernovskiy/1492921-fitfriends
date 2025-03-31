import { FormEvent, JSX, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  Logo,
  FilledButton,
  ToggleRadio,
  CustomInput,
  ChecklistButton,
} from '@frontend/components';
import { ToggleRadioCaptionSize } from '@frontend/types/component';
import {
  Level,
  Questionnaire,
  Specialization,
  Duration,
} from '@project/shared';
import { fillQuestionnaire } from '@frontend/store';
import { useAppDispatch } from '@frontend/src/hooks';

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
  const params = useParams();
  const { userId } = params;

  const dispatch = useAppDispatch();

  const [specialization, setSpecialization] = useState<Specialization[]>([]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userId) {
      throw new Error('userId не указан в маршруте');
    }
    if (specialization.length === 0) {
      const specializationFields = e.currentTarget.querySelector(
        '[name="specialization"]'
      ) as HTMLInputElement;
      specializationFields.setCustomValidity(
        'Необходимо выбрать хотя бы одну специализацию'
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
    dispatch(fillQuestionnaire({ userId, questionnaire }));
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
                    <ToggleRadio
                      classPrefix="questionnaire-user"
                      name="Duration"
                      caption="Сколько времени вы готовы уделять на тренировку в день"
                      items={Duration}
                      captionSize={ToggleRadioCaptionSize.Big}
                    />
                    <ToggleRadio
                      classPrefix="questionnaire-user"
                      name="level"
                      caption="Ваш уровень"
                      items={Level}
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
