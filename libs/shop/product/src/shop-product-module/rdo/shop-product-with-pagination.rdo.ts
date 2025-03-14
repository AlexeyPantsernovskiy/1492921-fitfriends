import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { CommonProperty } from '@project/shared-core';

import { ShopProductRdo } from './shop-product.rdo';
import { ShopProductProperty } from '../swagger/shop-product-property';

export class ShopProductWithPaginationRdo {
  @ApiProperty(ShopProductProperty.ProductList.Description)
  @Type(() => ShopProductRdo)
  @ValidateNested({ always: true })
  @Expose()
  public entities: ShopProductRdo[];

  @ApiProperty(CommonProperty.TotalPages.Description)
  @Expose()
  public totalPages: number;

  @ApiProperty(CommonProperty.TotalItems.Description)
  @Expose()
  public totalItems: number;

  @ApiProperty(CommonProperty.CurrentPage.Description)
  @Expose()
  public currentPage: number;

  @ApiProperty(CommonProperty.ItemsPerPage.Description)
  @Expose()
  public itemsPerPage: number;
}
