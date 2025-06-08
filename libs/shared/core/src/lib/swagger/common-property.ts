import { SortDirection } from '../types/sort-direction.enum';

export const CommonProperty = {
  TotalPages: {
    Description: {
      description: 'Общее количество страниц',
      example: 10,
    },
  },
  TotalItems: {
    Description: {
      description: 'Общее количество элементов',
      example: 200,
    },
  },
  CurrentPage: {
    Description: {
      description: 'Номер текущей страницы',
      example: 1,
      required: false,
    },
  },
  ItemsPerPage: {
    Description: {
      description: 'Количество элементов на странице',
      example: 9,
      required: false,
    },
  },
  SortDirection: {
    Description: {
      description: 'Направление сортировки',
      enum: SortDirection,
      enumName: 'SortDirection',
      example: SortDirection.Desc,
      required: false,
    },
  },
} as const;
