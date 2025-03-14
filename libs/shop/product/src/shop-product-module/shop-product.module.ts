import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/shop-models';

import { ShopProductController } from './shop-product.controller';
import { ShopProductService } from './shop-product.service';
import { ShopProductRepository } from './shop-product.repository';
import { ShopProductFactory } from './shop-product.factory';

@Module({
  imports: [PrismaClientModule],
  controllers: [ShopProductController],
  providers: [ShopProductService, ShopProductRepository, ShopProductFactory],
  exports: [ShopProductService],
})
export class ShopProductModule {}
