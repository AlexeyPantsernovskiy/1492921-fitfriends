export const ShopProductOperation = {
  CreateProduct: { summary: 'Создание нового товара' },
  UpdateProduct: { summary: 'Редактирование товара' },
  Delete: { summary: 'Удаление товара' },
  Index: { summary: 'Получение списка товаров' },
  View: { summary: 'Получение детальной информации по товару' },
  ProductTypes: { summary: 'Получение информации о типах товаров' },
} as const;
