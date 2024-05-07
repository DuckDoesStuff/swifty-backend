import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Req, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Request } from 'express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto, @Req() req: Request) {
    try {
      return this.productService.createProduct(createProductDto, req.merchant);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create product');
    }
  }

  @Post("/thumbnail/:id")
  createThumbnail(@Param('id') id: string, @Body() thumbnailUrl: string[]) {
    try {
      return this.productService.createProductThumbnail(id, thumbnailUrl);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update thumbnail');
    }
  }

  @Get()
  getAll(@Query('limit') limit: string, @Query('offset') offset: string) {
    const limitInt = limit ? parseInt(limit, 10) : 10;
    const offsetInt = offset ? parseInt(offset, 10) : 0;
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.productService.findOneWithId(id);
  }


  // @Get()
  // findAll() {
  //   return this.productService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Req() req: Request) {
  //   return this.productService.updateProduct(id, updateProductDto, req.merchant);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productService.removeProduct(+id);
  // }
}
