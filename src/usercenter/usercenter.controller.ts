import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsercenterService } from './usercenter.service';
import { CreateUsercenterDto } from './dto/create-usercenter.dto';
import { UpdateUsercenterDto } from './dto/update-usercenter.dto';

@Controller('usercenter')
export class UsercenterController {
  constructor(private readonly usercenterService: UsercenterService) {}

  @Post()
  createUser(@Body() createUsercenterDto: CreateUsercenterDto) {
    return this.usercenterService.createUser(createUsercenterDto);
  }

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.usercenterService.findAll(page, limit);
  }

  @Get(':identifier')
  findOne(@Param('identifier') identifier: string) {
    return this.usercenterService.findOne(identifier);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUsercenterDto: UpdateUsercenterDto,
  ) {
    return this.usercenterService.update(+id, updateUsercenterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usercenterService.remove(+id);
  }
}
