import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { ShopProductProperty } from '../swagger/shop-product-property';
import { GuitarTypeInfo } from '@project/shared-core';


export class ShopProductTypesRdo {
  @ApiProperty(ShopProductProperty.ProductTypes.Description)
  @Expose()
  public productTypes: GuitarTypeInfo;
}
