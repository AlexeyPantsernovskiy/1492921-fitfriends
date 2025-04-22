import { FormEvent, JSX, useRef, useState } from 'react';

import {
  Logo,
  FilledButton,
  ToggleRadio,
  ChecklistButton,
  CustomTextarea,
  CheckboxIcon,
} from '@frontend/components';
import { ToggleRadioCaptionSize } from '@frontend/types/component';
import { LevelName, Specialization, UserLimit } from '@project/shared';
import { fillCoachQuestionnaire } from '@frontend/store';
import { useAppDispatch } from '@frontend/src/hooks';
import history from '@frontend/src/history';
import { AppRoute } from '@frontend/const';

const FILE_PLACEHOLDER = 'Загрузите сюда файл формата PDF';

const QuestionnaireCoach = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [selectedCertificate, setSelectedCertificate] = useState<File | null>(
    null
  );
  const fileNameRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>(FILE_PLACEHOLDER);
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
    formData.delete('individual-training');
    try {
      await dispatch(fillCoachQuestionnaire(formData)).unwrap();
      history.push(AppRoute.PersonalAccount);
    } catch (error) {
      throw new Error(`Ошибка при сохранении данных: ${error}`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setSelectedCertificate(files[0]);
      setFileName(files[0].name);
      if (fileNameRef.current) {
        fileNameRef.current.style.color = 'black';
      }
    } else {
      setSelectedCertificate(null);
      setFileName(FILE_PLACEHOLDER);
      if (fileNameRef.current) {
        fileNameRef.current.style = '';
      }
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
                    <ToggleRadio
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
                      <div className="drag-and-drop questionnaire-coach__drag-and-drop">
                        <label>
                          <span
                            className="drag-and-drop__label"
                            tabIndex={0}
                            ref={fileNameRef}
                          >
                            {fileName}
                            <svg width="20" height="20" aria-hidden="true">
                              <use xlinkHref="#icon-import"></use>
                            </svg>
                          </span>
                          <input
                            type="file"
                            name="import"
                            tabIndex={-1}
                            accept=".pdf"
                            className="visually-hidden"
                            onChange={handleFileChange}
                            required
                          />
                        </label>
                      </div>
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
                    <FilledButton classPrefix="questionnaire-coach" />
                  </div>
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
