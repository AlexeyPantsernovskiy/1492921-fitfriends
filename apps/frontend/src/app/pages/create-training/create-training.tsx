import { FormEvent, useRef, useState } from 'react';

import { useAppDispatch } from '@frontend/src/hooks';
import { createTraining } from '@frontend/store';
import history from '@frontend/src/history';
import {
  CustomInput,
  CustomSelect,
  CustomTextarea,
  FilledButton,
  ToggleRadio,
} from '@frontend/components';
import InputFile from '@frontend/src/components/input-file/input-file';
import {
  Duration,
  DurationName,
  Level,
  LevelName,
  SexNameForTraining,
  Specialization,
} from '@project/shared';

function CreateTraining(): JSX.Element {
  const dispatch = useAppDispatch();
  const [selectedVideo, setVideo] = useState<File | null>(null);
  const [specialization, setSpecialization] = useState<Specialization | null>();
  const [level, setLevel] = useState<Level | null>();
  const [duration, setDuration] = useState<Duration | null>();

  //const [sex, setSex] = useState();

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append('sex', formData.get('gender')?.toString() || '');
    formData.append('name', formData.get('training-name')?.toString() || '');
    formData.set('specialization', specialization as Specialization);
    formData.set('level', level as string);
    formData.set('duration', duration as string);
    formData.delete('gender');
    formData.delete('training-name');
    formData.delete('import');
    if (selectedVideo) {
      formData.append('videoFile', selectedVideo);
    }
    try {
      await dispatch(createTraining(formData)).unwrap();
      history.back();
    } catch (error) {
      throw new Error(`Ошибка при сохранении данных: ${error}`);
    }
  };

  return (
    <div className="popup-form popup-form--create-training">
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__title-wrapper">
            <h1 className="popup-form__title">Создание тренировки</h1>
          </div>
          <div className="popup-form__form">
            <form method="get" onSubmit={handleFormSubmit}>
              <div className="create-training">
                <div className="create-training__wrapper">
                  <div className="create-training__block">
                    <h2 className="create-training__legend">
                      Название тренировки
                    </h2>
                    <CustomInput
                      name="training-name"
                      caption="Название тренировки"
                      classPrefix={'create-training'}
                    />
                  </div>
                  <div className="create-training__block">
                    <h2 className="create-training__legend">
                      Характеристики тренировки
                    </h2>
                    <div className="create-training__info">
                      <CustomSelect
                        items={Specialization}
                        caption="Выберите тип тренировки"
                        value={specialization as string}
                        addClassNames="create-training"
                        onSelect={(value) =>
                          setSpecialization(value as Specialization)
                        }
                      />
                      <CustomInput
                        name="calories"
                        type="number"
                        caption="Сколько калорий потратим"
                        rightText="ккал"
                      />
                      <CustomSelect
                        items={DurationName}
                        caption="Сколько времени потратим"
                        value={duration as string}
                        addClassNames="create-training"
                        onSelect={(value) => setDuration(value as Duration)}
                      />
                      <CustomInput
                        name="price"
                        type="number"
                        caption="Стоимость тренировки"
                        rightText="₽"
                      />
                      <CustomSelect
                        items={LevelName}
                        caption="Выберите уровень тренировки"
                        value={level as string}
                        addClassNames="create-training"
                        onSelect={(value) => setLevel(value as Level)}
                      />
                      <ToggleRadio
                        name="gender"
                        caption="Кому подойдет тренировка"
                        classPrefix="create-training"
                        items={SexNameForTraining}
                      />
                    </div>
                  </div>
                  <div className="create-training__block">
                    <h2 className="create-training__legend">
                      Описание тренировки
                    </h2>
                    <CustomTextarea
                      classPrefix="create-training"
                      name="description"
                    />
                  </div>
                  <div className="create-training__block">
                    <h2 className="create-training__legend">
                      Загрузите видео-тренировку
                    </h2>
                    <InputFile
                      classPrefix="questionnaire-coach"
                      fileMask=".mov, .avi, .mp4"
                      placeholder="Загрузите сюда файлы формата MOV, AVI или MP4"
                      onChange={setVideo}
                    />
                  </div>
                </div>
                <FilledButton classPrefix="create-training" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTraining;
