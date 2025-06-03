import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, HttpCode } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Admin endpoints
  @Post('admin/products')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get('admin/products')
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.productService.findAll(page, limit);
  }

  @Get('admin/products/:id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch('admin/products/:id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete('admin/products/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.productService.remove(+id);
  }

  // Public endpoints
  @Get('products')
  findAllActive(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.productService.findAllActive(page, limit);
  }

  @Get('products/:id')
  findOnePublic(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }
}
