import { Injectable } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { Repository } from 'typeorm';
import { Merchant } from 'src/merchant/entities/merchant.entity';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
    @InjectRepository(Merchant)
    private merchantRepository: Repository<Merchant>,
  ) {}

  async createShop(createShopDto: CreateShopDto, merchantId: number) {
    try {
      const merchant = await this.merchantRepository.findOne({where: {id: merchantId}});
      const shop = this.shopRepository.create({
        ...createShopDto,
        merchant,
      });
      return await this.shopRepository.save(shop);
    } catch (error) {
      throw new Error('Failed to create shop');
    }
  }

  findAllShopFromMerchant(merchantId: number) {
    return this.shopRepository.find({where: {merchant: {id: merchantId}}});
  }

  findAll() {
    return this.shopRepository.find();
  }

  findOne(id: number) {
    return this.shopRepository.findOne({where: {id}});
  }

  updateShop(id: number, updateShopDto: UpdateShopDto) {
    return this.shopRepository.update(id, updateShopDto);
  }

  removeShop(id: number) {
    return this.shopRepository.delete(id);
  }
}
