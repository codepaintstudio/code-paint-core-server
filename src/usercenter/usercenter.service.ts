import { Injectable } from '@nestjs/common';
import { CreateUsercenterDto } from './dto/create-usercenter.dto';
import { UpdateUsercenterDto } from './dto/update-usercenter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/usercenter.entity';
import { Repository } from 'typeorm';
import { validateOrReject } from 'class-validator';

@Injectable()
export class UsercenterService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async createUser(createUsercenterDto: CreateUsercenterDto) {
    await validateOrReject(createUsercenterDto);
    const newUser = this.userRepository.create({
      ...createUsercenterDto,
      createTime: new Date(), // 自动设置创建时间
      updateTime: new Date(), // 自动设置更新时间
    });
    return this.userRepository.save(newUser);
  }

  async findAll(page, limit) {
    const skip = (page - 1) * limit; // 计算跳过的记录数
    const [data, total] = await this.userRepository.findAndCount({
      skip, // 跳过记录数
      take: limit, // 每页记录数
      order: { createTime: 'DESC' }, // 按创建时间倒序排列
    });

    return { total, data };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ userId: id });
    if (!user) {
      throw new Error(`用户 ID 为 ${id} 的记录不存在`);
    }
    return user;
  }

  async update(id: number, updateUsercenterDto: UpdateUsercenterDto) {
    const user = await this.userRepository.findOneBy({ userId: id });
    if (!user) {
      throw new Error(`用户 ID 为 ${id} 的记录不存在`);
    }

    // 合并更新数据
    Object.assign(user, updateUsercenterDto);
    user.updateTime = new Date(); // 更新时间

    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ userId: id });
    if (!user) {
      throw new Error(`用户 ID 为 ${id} 的记录不存在`);
    }

    await this.userRepository.delete(id);
  }
}
