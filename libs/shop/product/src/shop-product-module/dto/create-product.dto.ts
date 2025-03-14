import {
  IsDate,
  IsEnum,
  IsISO8601,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import {
  GuitarStrings,
  GuitarType,
  GuitarTypeInfo,
} from '@project/shared-core';
import { ShopProductProperty } from '../swagger/shop-product-property';

export class CreateProductDto {
  @ApiProperty(ShopProductProperty.Name.Description)
  @Expose()
  @IsString()
  @Length(
    ShopProductProperty.Name.Validate.MinLength,
    ShopProductProperty.Name.Validate.MaxLength,
    { message: ShopProductProperty.Name.Validate.Message }
  )
  name: string;

  @ApiProperty(ShopProductProperty.Description.Description)
  @Expose()
  @IsString()
  @Length(
    ShopProductProperty.Description.Validate.MinLength,
    ShopProductProperty.Description.Validate.MaxLength,
    { message: ShopProductProperty.Description.Validate.Message }
  )
  description: string;

  @ApiProperty(ShopProductProperty.CreateDate.Description)
  @Expose()
  @Transform(({ value }) =>  new Date(value))
  @IsDate()
  createDate: Date;

  @ApiProperty(ShopProductProperty.Photo.Description)
  @Expose()
  @IsString()
  photo: string;

  @ApiProperty(ShopProductProperty.typeCode.Description)
  @Expose()
  @IsEnum(GuitarType, {
    message: ShopProductProperty.typeCode.Validate.Message,
  })
  typeCode: GuitarType;

  @ApiProperty(ShopProductProperty.Barcode.Description)
  @Expose()
  @IsString()
  @Length(
    ShopProductProperty.Barcode.Validate.MinLength,
    ShopProductProperty.Barcode.Validate.MaxLength,
    { message: ShopProductProperty.Barcode.Validate.Message }
  )
  barcode: string;

  @ApiProperty(ShopProductProperty.CountStrings.Description)
  @Expose()
  @Transform(({ value, obj }) => {
    return GuitarTypeInfo[obj.typeCode]?.countStrings.includes(+value)
      ? +value
      : null;
  })
  @IsNotEmpty({ message: ShopProductProperty.CountStrings.Validate.Message })
  countStrings: GuitarStrings;

  @ApiProperty(ShopProductProperty.Price.Description)
  @Expose()
  @IsNumber()
  @Transform(({ value }) => +value)
  @Min(ShopProductProperty.Price.Validate.MinLength, {
    message: ShopProductProperty.Price.Validate.Message,
  })
  @Max(ShopProductProperty.Price.Validate.MaxLength, {
    message: ShopProductProperty.Price.Validate.Message,
  })
  price: number;
}
