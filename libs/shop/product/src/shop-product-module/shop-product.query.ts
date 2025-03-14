import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsIn, IsOptional } from 'class-validator';

import {
  CommonProperty,
  GuitarStrings,
  GuitarType,
  SortDirection,
  SortType,
} from '@project/shared-core';

import {
  ShopProductPaginationDefault,
  ShopProductSortDefault,
} from './shop-product.constant';
import { ShopProductProperty } from './swagger/shop-product-property';

export class ShopProductQuery {
  public limit: number = ShopProductPaginationDefault.CountLimit;

  @ApiProperty(ShopProductProperty.SortDirection.Description)
  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection?: SortDirection = ShopProductSortDefault.Direction;

  @ApiProperty(ShopProductProperty.SortType.Description)
  @IsIn(Object.values(SortType))
  @IsOptional()
  public sortBy?: SortType = ShopProductSortDefault.Type;

  @ApiProperty(CommonProperty.CurrentPage.Description)
  @Transform(
    ({ value }) =>
      parseInt(value, 10) || ShopProductPaginationDefault.PageCurrent
  )
  @IsOptional()
  public page?: number = ShopProductPaginationDefault.PageCurrent;

  @ApiProperty(ShopProductProperty.typeCodes.Description)
  @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
  @IsEnum(GuitarType, { each: true })
  @IsArray()
  @IsOptional()
  public typeCodes?: GuitarType[];

  @ApiProperty(ShopProductProperty.CountsStrings.Description)
  @Transform(({ value }) =>
    typeof value === 'string' ? [+value] : value.map((item) => +item)
  )
  @IsIn(GuitarStrings, { each: true })
  @IsArray()
  @IsOptional()
  countsStrings?: GuitarStrings[];
}
