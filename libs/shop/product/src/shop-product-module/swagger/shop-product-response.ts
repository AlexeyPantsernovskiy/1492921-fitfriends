import { HttpStatus } from '@nestjs/common';

import { ShopProductError } from '../shop-product.constant';
import { ShopProductRdo } from '../rdo/shop-product.rdo';
import { ShopProductWithPaginationRdo } from '../rdo/shop-product-with-pagination.rdo';
import { ShopProductTypesRdo } from '../rdo/shop-product-types.rdo';

export const ShopProductResponse = {
  ProductCreated: {
    type: ShopProductRdo,
    status: HttpStatus.CREATED,
    description: 'Новый товар успешно создан',
  },
  ProductUpdated: {
    type: ShopProductRdo,
    status: HttpStatus.OK,
    description: 'Товар изменен',
  },
  ProductDeleted: {
    status: HttpStatus.OK,
    description: 'Товар удален',
  },
  ProductFound: {
    type: ShopProductRdo,
    status: HttpStatus.OK,
    description: 'Детальная информации по товару получена',
  },
  ProductNotFound: {
    status: HttpStatus.NOT_FOUND,
    description: ShopProductError.ProductNotFound,
  },
  ProductList: {
    type: ShopProductWithPaginationRdo,
    status: HttpStatus.OK,
    description: 'Список товаров получен',
  },
  ProductTypes: {
    type: ShopProductTypesRdo,
    status: HttpStatus.OK,
    description: 'Список типов товаров',
  },
} as const;
