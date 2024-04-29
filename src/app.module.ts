import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';
import { MerchantModule } from './merchant/merchant.module';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './product/product.module';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      url: "postgres://admin:admin@db:5432/swifty",
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    CustomerModule,
    MerchantModule,
    CartModule,
    ProductModule,
    ShopModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
