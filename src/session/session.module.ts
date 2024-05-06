import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { CustomerService } from 'src/customer/customer.service';
import { MerchantService } from 'src/merchant/merchant.service';
import { Customer } from 'src/customer/entities/customer.entity';
import { Merchant } from 'src/merchant/entities/merchant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Session]), 
    TypeOrmModule.forFeature([Customer]), 
    TypeOrmModule.forFeature([Merchant])
  ],
  controllers: [SessionController],
  providers: [SessionService, CustomerService, MerchantService],
})
export class SessionModule {}
