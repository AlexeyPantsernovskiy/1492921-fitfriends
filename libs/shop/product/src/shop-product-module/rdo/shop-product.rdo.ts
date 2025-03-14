import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import {
  GuitarStrings,
  GuitarType,
} from '@project/shared-core';

import { ShopProductProperty } from '../swagger/shop-product-property';

export class ShopProductRdo {
  @ApiProperty(ShopProductProperty.Id.Description)
  @Expose()
  public id: string;

  @ApiProperty(ShopProductProperty.Name.Description)
  @Expose()
  name: string;

  @ApiProperty(ShopProductProperty.Description.Description)
  @Expose()
  description: string;

  @ApiProperty(ShopProductProperty.CreateDate.Description)
  @Expose()
  public createDate: Date;

  @ApiProperty(ShopProductProperty.Photo.Description)
  @Expose()
  photo: string;

  @ApiProperty(ShopProductProperty.typeCode.Description)
  @Expose()
  typeCode: GuitarType;

  @ApiProperty(ShopProductProperty.typeName.Description)
  @Expose()
  typeName: string;

  @ApiProperty(ShopProductProperty.Barcode.Description)
  @Expose()
  barcode: string;

  @ApiProperty(ShopProductProperty.CountStrings.Description)
  @Expose()
  countStrings: GuitarStrings;

  @ApiProperty(ShopProductProperty.Price.Description)
  @Expose()
  price: number;
}
