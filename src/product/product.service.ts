import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ShopService } from 'src/shop/shop.service';
import { Merchant } from 'src/merchant/entities/merchant.entity';
import { Shop } from 'src/shop/entities/shop.entity';
import { ProductImage } from 'src/productimage/entities/productimage.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Merchant)
    private merchantRepository: Repository<Merchant>,
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,
  ) {}

  async createProduct(createProductDto: CreateProductDto, merchant: Merchant) {
    try {
      // Check if shop exist and belongs to merchant
      const shopExist = await this.shopRepository.findOne({where: {nameId: createProductDto.shopNameId, merchant: merchant}});
      if (!shopExist) {
        throw new Error('Shop does not exist');
      }
      const newProduct = this.productRepository.create({
        ...createProductDto,
        shop: shopExist
      });
      return this.productRepository.save(newProduct);
    }
    catch (error) {
      throw new Error('Failed to create product');
    }
  }


  // findAll() {
  //   return this.productRepository.find();
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} product`;
  // }

  async createProductThumbnail(id: string, thumbnailUrl: string[]) {
    const product = await this.productRepository.findOne({where: {id}});
    if (!product) {
      throw new Error('Product does not exist');
    }
    
    for (let i = 0; i < thumbnailUrl.length; i++) {
      const productImage = this.productImageRepository.create({
        url: thumbnailUrl[i],
        product: product
      });
      await this.productImageRepository.save(productImage);
    }

    
    return {statusCode: 200, message: 'Thumbnail created'};
  }


  findOneWithId(id: string) {
    return this.productRepository.findOne({where: {id}});
  }
}
