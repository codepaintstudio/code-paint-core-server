import { Injectable } from '@nestjs/common';
import { CreateUsercenterDto } from './dto/create-usercenter.dto';
import { UpdateUsercenterDto } from './dto/update-usercenter.dto';

@Injectable()
export class UsercenterService {
  create(createUsercenterDto: CreateUsercenterDto) {
    return 'This action adds a new usercenter';
  }

  findAll() {
    return `This action returns all usercenter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usercenter`;
  }

  update(id: number, updateUsercenterDto: UpdateUsercenterDto) {
    return `This action updates a #${id} usercenter`;
  }

  remove(id: number) {
    return `This action removes a #${id} usercenter`;
  }
}
