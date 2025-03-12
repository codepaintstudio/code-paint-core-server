import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsercenterService } from './usercenter.service';
import { CreateUsercenterDto } from './dto/create-usercenter.dto';
import { UpdateUsercenterDto } from './dto/update-usercenter.dto';

@Controller('usercenter')
export class UsercenterController {
  constructor(private readonly usercenterService: UsercenterService) {}

  @Post()
  create(@Body() createUsercenterDto: CreateUsercenterDto) {
    return this.usercenterService.create(createUsercenterDto);
  }

  @Get()
  findAll() {
    return this.usercenterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usercenterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsercenterDto: UpdateUsercenterDto) {
    return this.usercenterService.update(+id, updateUsercenterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usercenterService.remove(+id);
  }
}
