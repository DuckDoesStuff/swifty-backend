import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { SessionService } from 'src/session/session.service';
import { Session } from 'src/session/entities/session.entity';
import { CustomerService } from 'src/customer/customer.service';
import { MerchantService } from 'src/merchant/merchant.service';
import { Customer } from 'src/customer/entities/customer.entity';
import { Merchant } from 'src/merchant/entities/merchant.entity';
import { AuthMiddleware } from 'src/middleware/auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Shop]),
    TypeOrmModule.forFeature([Session]),
    TypeOrmModule.forFeature([Customer]),
    TypeOrmModule.forFeature([Merchant]),
  ],
  controllers: [ShopController],
  providers: [ShopService, SessionService, CustomerService, MerchantService],
})
export class ShopModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'shop/:id', method: RequestMethod.GET },
      )
      .forRoutes(ShopController);
  }
}
