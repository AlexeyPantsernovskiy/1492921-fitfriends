import { ShopProductProperty } from './shop-product-property';

export const ShopProductParam = {
  ProductId: {
    name: 'productId',
    type: String,
    schema: ShopProductProperty.Id,
  },
} as const;
