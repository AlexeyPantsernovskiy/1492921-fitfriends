import { Injectable, NotFoundException } from '@nestjs/common';

import { PaginationResult } from '@project/shared-core';

import { ShopProductRepository } from './shop-product.repository';
import { ShopProductEntity } from './shop-product.entity';
import { ShopProductFactory } from './shop-product.factory';
import { ShopProductQuery } from './shop-product.query';
import { CreateProductDto } from './dto/create-product.dto';
import { NO_UPDATE_PHOTO } from './shop-product.constant';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ShopProductService {
  constructor(private shopProductRepository: ShopProductRepository) {}

  public async getProducts(
    query?: ShopProductQuery
  ): Promise<PaginationResult<ShopProductEntity>> {
    return this.shopProductRepository.find(query);
  }

  public async createProduct(dto: CreateProductDto): Promise<ShopProductEntity> {
    const newProduct = ShopProductFactory.createNewProduct(dto);
    return await this.shopProductRepository.insert(newProduct);
  }

  public async updateProduct(
    id: string,
    dto: UpdateProductDto
  ): Promise<ShopProductEntity> {
    const product = await this.shopProductRepository.findById(id);
    if (dto.photo === NO_UPDATE_PHOTO) {
      dto.photo = product.photo;
    }
    let hasChanges = false;
    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && product[key] !== value) {
        product[key] = value;
        hasChanges = true;
      }
    }
    if (hasChanges) {
      return await this.shopProductRepository.update(product);
    }
    return product;
  }

  public async deleteProduct(productId: string): Promise<void> {
    try {
      await this.shopProductRepository.delete(productId);
    } catch {
      throw new NotFoundException(`Товар с ID ${productId} не найден!`);
    }
  }

  public async getProduct(productId: string): Promise<ShopProductEntity> {
    return this.shopProductRepository.findById(productId);
  }
}
