import { CustomInputProps } from '@frontend/components';
import { DISCOUNT } from '@frontend/const';
import { FileLoading, PaymentType } from '@project/shared';

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
  LoadFile: {
    caption: 'Загрузить файл',
    name: 'icon-import',
    width: 20,
    height: 20,
  },
  LoadVideo: {
    caption: 'Загрузить видео',
    name: 'icon-import-video',
    width: 20,
    height: 20,
  },
  Discount: {
    caption: `Сделать скидку ${DISCOUNT * 100} %`,
    name: 'icon-discount',
    width: 14,
    height: 14,
  },
  DiscountUndo: {
    caption: 'Отменить скидку',
    name: 'icon-discount',
    width: 14,
    height: 14,
  },
  Close: {
    caption: 'Close',
    name: 'icon-cross',
    width: 20,
    height: 20,
  },
  Minus: {
    caption: 'Minus',
    name: 'icon-minus',
    width: 12,
    height: 12,
  },
  Plus: {
    caption: 'Plus',
    name: 'icon-plus',
    width: 12,
    height: 12,
  },
  ViewCertificate: {
    caption: 'Посмотреть сертификаты',
    name: 'icon-teacher',
    width: 12,
    height: 13,
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

export const FileLoadingInput = {
  Video: {
    ...FileLoading.Video,
    Icon: Icon.LoadVideo,
  },
  Certificate: {
    ...FileLoading.Certificate,
    Icon: Icon.LoadFile,
  },
  Avatar: {
    ...FileLoading.Avatar,
    Icon: Icon.LoadFile,
  },
  Photo: {
    ...FileLoading.Photo,
    Icon: Icon.LoadFile,
  },
} as const;

export const PayType = {
  Visa: { code: PaymentType.Visa, logo: 'visa-logo', label: 'Visa.' },
  Mir: { code: PaymentType.Mir, logo: 'mir-logo', label: 'Мир.' },
  Umoney: { code: PaymentType.Umoney, logo: 'iomoney-logo', label: 'Iomoney.' },
} as const;
