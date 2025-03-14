import {
  GuitarStrings,
  GuitarType,
  GuitarTypeInfo,
  SortDirection,
  SortType,
} from '@project/shared-core';

import { ShopProductSortDefault } from '../shop-product.constant';

export const ShopProductProperty = {
  Id: {
    Description: {
      description: 'Уникальный идентификатор товара (ID)',
      example: '2f31b19b-97eb-4305-877a-0b9be7faca8f',
    },
  },
  Name: {
    Description: {
      description: 'Наименование товара',
      example: 'Fender Esquire',
    },
    Validate: {
      MinLength: 10,
      MaxLength: 100,
      Message: 'Наименование товара (name) должно быть от 10 до 100 символов',
    },
  },
  Description: {
    Description: {
      description: 'Описание товара',
      example:
        'Бюджетная модель, которую Брюс Спрингстин переделал под себя и усовершенствовал',
    },
    Validate: {
      MinLength: 20,
      MaxLength: 1024,
      Message:
        'Описание товара (description) должно быть от 20 до 1024 символа',
    },
  },
  CreateDate: {
    Description: {
      description: 'Дата добавления товара',
      example: new Date().toISOString().split('T')[0],
    },
  },
  Photo: {
    Description: {
      description: 'Относительный путь к файлу с фотографией товара',
      example: '2025/01/1246dd6d-8b8c-40a4-a128-bb5e20c44165.jpeg',
    },
  },
  PhotoFile: {
    Description: {
      description: 'Файл с фотографией товара',
      type: 'string',
      format: 'binary',
    },
    Validate: {
      FileExtRegExp: /\.(jpg|jpeg|png)$/i,
      //MaxSize: 1024 * 1024,
      Message: 'Допускается загрузка изображения в формате jpg или png',
    },
  },
  typeCode: {
    Description: {
      description: 'Тип товара (мнемокод)',
      enum: GuitarType,
      example: GuitarTypeInfo.acoustic.code,
    },
    Validate: {
      Message: `Тип товара (мнемокод) должен быть одним из вариантов: ${Object.keys(GuitarType).join(', ')}`,
    },
  },
  typeName: {
    Description: {
      description: 'Название типа товара',
      example: GuitarTypeInfo.acoustic.name,
    },
  },
  Barcode: {
    Description: {
      description: 'Артикул товара',
      example: '50684-345',
    },
    Validate: {
      MinLength: 5,
      MaxLength: 40,
      Message: 'Артикул товара (barcode) должен быть от 5 до 40 символов',
    },
  },
  CountStrings: {
    Description: {
      description: 'Количество струн',
      enum: GuitarStrings,
      example: GuitarTypeInfo.acoustic.countStrings[0],
    },
    Validate: {
      Message: 'Недопустимое кол-во струн для данного типа гитары',
    },
  },
  Price: {
    Description: {
      description: 'Цена товара',
      example: 145.5,
    },
    Validate: {
      MinLength: 100,
      MaxLength: 1000000,
      Message: 'Цена товара (price) должна быть в диапазоне от 100 до 1000000',
    },
  },

  ProductList: {
    Description: {
      description: 'Список товаров',
      example: '[{productObject1}, {productObject2}]',
      isArray: true,
    },
  },

  typeCodes: {
    Description: {
      description: 'Кодовое название типа товара',
      enum: GuitarType,
      isArray: true,
      example: [GuitarTypeInfo.acoustic.code, GuitarTypeInfo.ukulele.code],
      required: false,
    },
  },
  CountsStrings: {
    Description: {
      description: 'Количество струн',
      enum: GuitarStrings,
      isArray: true,
      example: [GuitarStrings[1], GuitarStrings[2]],
      required: false,
    },
  },
  SortDirection: {
    Description: {
      description: 'Направление сортировки',
      enum: SortDirection,
      enumName: 'SortDirection',
      example: ShopProductSortDefault.Direction,
      required: false,
    },
  },
  SortType: {
    Description: {
      description: 'Вариант сортировки',
      enum: SortType,
      enumName: 'SortType',
      example: ShopProductSortDefault.Type,
      required: false,
    },
  },

  ProductTypes: {
    Description: {
      description: 'Типы товаров',
      example: GuitarTypeInfo,
    },
  },
} as const;
