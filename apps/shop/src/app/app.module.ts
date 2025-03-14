import { Module } from '@nestjs/common';

import { ShopProductModule } from '@project/shop-product';
import { ShopConfigModule } from '@project/shop-config';

@Module({
  imports: [ShopProductModule, ShopConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
