import { CustomInputProps } from '@frontend/components';

export const SpinnerText = {
  Loading: 'Загрузка...',
  Saving: 'Сохранение...',
} as const;
export type SpinnerText = (typeof SpinnerText)[keyof typeof SpinnerText];

export const FormField = {
  Name: { name: 'name', caption: 'Имя', type: 'text' },
  Email: { name: 'email', caption: 'E-mail', type: 'email' },
  Birthday: {
    name: 'birthday',
    caption: 'Дата рождения',
    type: 'date',
    max: '2099-12-31',
    required: false,
  },
  Password: { name: 'password', caption: 'Пароль', type: 'password' },
  Sex: { name: 'sex', caption: 'Пол' },
  Description: {
    name: 'description',
    caption: 'Описание',
    required: false,
  },
} as const satisfies Record<string, CustomInputProps>;

export const Icon = {
  Refresh: { caption: 'Обновить', iconName: 'icon-change' },
  Delete: { caption: 'Удалить', iconName: 'icon-trash' },
  Exit: { caption: 'Выход', iconName: 'arrow-right' },
  Edit: { caption: 'Редактировать', iconName: 'icon-edit' },
} as const;
export type IconAttr = (typeof Icon)[keyof typeof Icon];
export type IconName = (typeof Icon)[keyof typeof Icon]['iconName'];

export const ButtonType = {
  Button: 'button',
  Submit: 'submit',
} as const;
export type ButtonType = (typeof ButtonType)[keyof typeof ButtonType];

export const InputType = {
  Text: 'text',
  Email: 'email',
  Date: 'date',
  Password: 'password',
  Textarea: 'textarea',
  Number: 'number',
} as const;
export type InputType = (typeof InputType)[keyof typeof InputType];

export const ToggleRadioCaptionSize = {
  Big: { classCaption: 'legend', classDiv: 'block' },
  Normal: { classCaption: 'label', classDiv: 'radio' },
} as const;
export type ToggleRadioCaptionSize =
  (typeof ToggleRadioCaptionSize)[keyof typeof ToggleRadioCaptionSize];
