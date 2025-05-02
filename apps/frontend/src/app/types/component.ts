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

export const IconPosition = {
  Left: 'left',
  Right: 'right',
} as const;
export type IconPosition = (typeof IconPosition)[keyof typeof IconPosition];

export const Icon = {
  RefreshPhoto: {
    caption: 'Обновить фото',
    name: 'icon-change',
    width: 16,
    height: 16,
  },
  DeletePhoto: {
    caption: 'Удалить фото',
    name: 'icon-trash',
    width: 14,
    height: 16,
  },
  RefreshCertificate: {
    caption: 'Обновить сертификат',
    name: 'icon-change',
    width: 16,
    height: 16,
  },
  DeleteCertificate: {
    caption: 'Удалить сертификат',
    name: 'icon-trash',
    width: 14,
    height: 16,
  },
  Exit: { caption: 'Выход', name: 'arrow-right', width: 16, height: 16 },
  Edit: {
    caption: 'Редактировать',
    name: 'icon-edit',
    width: 12,
    height: 12,
  },
  MyPurchases: {
    caption: 'Мои покупки',
    name: 'icon-shopping-cart',
    width: 30,
    height: 26,
  },
  Friends: {
    caption: 'Мои друзья',
    name: 'icon-friends',
    width: 30,
    height: 26,
  },
  MyTraining: {
    caption: 'Мои тренировки',
    name: 'icon-flash',
    width: 30,
    height: 26,
  },
  AddTrain: {
    caption: 'Создать тренировку',
    name: 'icon-add',
    width: 30,
    height: 26,
  },
  MyOrders: {
    caption: 'Мои заказы',
    name: 'icon-bag',
    width: 30,
    height: 26,
  },
  ViewAll: {
    caption: 'Смотреть все',
    name: 'arrow-right',
    width: 14,
    height: 10,
  },
  Back: {
    caption: 'Назад',
    name: 'arrow-left',
    width: 14,
    height: 10,
  },
  Prev: {
    caption: 'Previous',
    name: 'arrow-left',
    width: 16,
    height: 14,
  },
  Next: {
    caption: 'Next',
    name: 'arrow-right',
    width: 16,
    height: 14,
  },
  Load: {
    caption: 'Загрузить',
    name: 'icon-import',
    width: 14,
    height: 14,
  },
} as const;
export type IconAttr = (typeof Icon)[keyof typeof Icon];
export type IconName = (typeof Icon)[keyof typeof Icon]['name'];

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

export const TextAlign = {
  Left: 'left',
  Center: 'center',
  Right: 'right',
} as const;
export type TextAlign = (typeof TextAlign)[keyof typeof TextAlign];
