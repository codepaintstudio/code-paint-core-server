import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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
    if (!newUser) {
      throw new BadRequestException('创建失败,请检查参数');
    }
    const data = await this.userRepository.save(newUser);
    return {
      success: true,
      status: 200,
      data: data,
      message: '创建成功',
    };
  }

  async findAll(page, limit) {
    const skip = (page - 1) * limit; // 计算跳过的记录数
    const [data, total] = await this.userRepository.findAndCount({
      skip, // 跳过记录数
      take: limit, // 每页记录数
      order: { createTime: 'DESC' }, // 按创建时间倒序排列
    });
    if (total === 0) {
      throw new InternalServerErrorException(`数量为0`);
    }
    return { total, data, message: '查询成功', success: true, status: 200 };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ userId: id });
    if (!user) {
      throw new InternalServerErrorException(`用户 ID 为 ${id} 的记录不存在`);
    }
    return {
      data: user,
      message: '查询成功',
      success: true,
      status: 200,
    };
  }

  async update(id: number, updateUsercenterDto: UpdateUsercenterDto) {
    const user = await this.userRepository.findOneBy({ userId: id });
    if (!user) {
      throw new InternalServerErrorException(`用户 ID 为 ${id} 的记录不存在`);
    }

    // 合并更新数据
    Object.assign(user, updateUsercenterDto);
    user.updateTime = new Date(); // 更新时间
    const data = await this.userRepository.save(user);
    return {
      message: '更新成功',
      success: true,
      status: 200,
      data: data,
    };
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ userId: id });
    if (!user) {
      throw new InternalServerErrorException(`用户 ID 为 ${id} 的记录不存在`);
    }
    const data = await this.userRepository.delete(id);
    return {
      message: '删除成功',
      success: true,
      status: 200,
      data: data,
    };
  }
}
