import {
  Entity,
  Guitar,
  GuitarType,
  StorableEntity,
} from '@project/shared-core';
export class ShopProductEntity
  extends Entity
  implements StorableEntity<Guitar>
{
  public name: string;
  public description: string;
  public createDate: Date;
  public photo: string;
  public typeCode: GuitarType;
  public countStrings: number;
  public barcode: string;
  public price: number;

  constructor(product?: Guitar) {
    super();
    this.populate(product);
  }

  public populate(product?: Guitar): void {
    if (!product) {
      return;
    }
    this.id = product.id ?? undefined;
    this.name = product.name;
    this.description = product.description;
    this.createDate = product.createDate ?? new Date();
    this.photo = product.photo;
    this.typeCode = product.typeCode;
    this.countStrings = product.countStrings;
    this.barcode = product.barcode;
    this.price = product.price;
  }

  public toPOJO(): Guitar {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      createDate: this.createDate,
      photo: this.photo,
      typeCode: this.typeCode,
      countStrings: this.countStrings,
      barcode: this.barcode,
      price: this.price,
    };
  }
}
