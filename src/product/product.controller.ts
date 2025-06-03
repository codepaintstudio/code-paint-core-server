import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, HttpCode } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  // Admin endpoints
  @Post('admin')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get('admin')
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.productService.findAll(page, limit);
  }

  @Get('admin/:id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch('admin/:id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete('admin/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.productService.remove(+id);
  }

  // Public endpoints
  @Get('')
  findAllActive(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.productService.findAllActive(page, limit);
  }

  @Get(':id')
  findOnePublic(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }
}
