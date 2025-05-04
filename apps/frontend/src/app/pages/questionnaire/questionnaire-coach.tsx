import { FormEvent, JSX, useState } from 'react';

import {
  Logo,
  FilledButton,
  ChecklistButton,
  CustomTextarea,
  CheckboxIcon,
  CustomToggleRadio,
} from '@frontend/components';
import {
  ToggleRadioCaptionSize,
  FileLoadingInput,
} from '@frontend/types/component';
import { LevelName, Specialization, UserLimit } from '@project/shared';
import { fillCoachQuestionnaire } from '@frontend/store';
import { useAppDispatch } from '@frontend/src/hooks';
import history from '@frontend/src/history';
import { AppRoute } from '@frontend/const';
import InputFile from '@frontend/src/components/input-file/input-file';

const QuestionnaireCoach = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [selectedCertificate, setSelectedCertificate] = useState<File | null>(
    null
  );
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
    formData.delete('import');
    if (selectedCertificate) {
      formData.append('certificateFile', selectedCertificate);
    }
    formData.delete('specialization');
    specialization.forEach((item) => {
      formData.append('specialization', item);
    });
    formData.set(
      'isReadyToTrain',
      formData.get('individual-training')?.toString() === 'individual-training'
        ? 'true'
        : 'false'
    );
    formData.append(
      'achievements',
      formData.get('description')?.toString() || ''
    );
    formData.delete('individual-training');
    formData.delete('description');
    try {
      await dispatch(fillCoachQuestionnaire(formData)).unwrap();
      history.push(AppRoute.PersonalAccount);
    } catch (error) {
      throw new Error(`Ошибка при сохранении данных: ${error}`);
    }
  };

  return (
    <>
      <Logo />
      <div className="popup-form popup-form--questionnaire-coach">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__form">
              <form method="get" onSubmit={handleFormSubmit}>
                <div className="questionnaire-coach">
                  <h1 className="visually-hidden">Опросник</h1>
                  <div className="questionnaire-coach__wrapper">
                    <div className="questionnaire-coach__block">
                      <span className="questionnaire-coach__legend">
                        Ваша специализация (тип) тренировок
                      </span>
                      <ChecklistButton
                        classPrefix="questionnaire-coach"
                        name="specialization"
                        items={Specialization}
                        value={specialization}
                        onChange={setSpecialization}
                      />
                    </div>
                    <CustomToggleRadio
                      classPrefix="questionnaire-coach"
                      name="level"
                      caption="Ваш уровень"
                      items={LevelName}
                      captionSize={ToggleRadioCaptionSize.Big}
                    />

                    <div className="questionnaire-coach__block">
                      <span className="questionnaire-coach__legend">
                        Ваши дипломы и сертификаты
                      </span>
                      <InputFile
                        classPrefix="questionnaire-coach"
                        fileType={FileLoadingInput.Certificate}
                        onChange={setSelectedCertificate}
                      />
                    </div>
                    <div className="questionnaire-coach__block">
                      <span className="questionnaire-coach__legend">
                        Расскажите о своём опыте, который мы сможем проверить
                      </span>
                      <CustomTextarea
                        name="description"
                        value={''}
                        classPrefix={'questionnaire-coach'}
                      />
                      <CheckboxIcon
                        classPrefix="questionnaire-coach"
                        caption="Хочу дополнительно индивидуально тренировать"
                        name="individual-training"
                        value="individual-training"
                        checked={true}
                      />
                    </div>
                  </div>
                  <FilledButton classPrefix="questionnaire-coach" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionnaireCoach;
