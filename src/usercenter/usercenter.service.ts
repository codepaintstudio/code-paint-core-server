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
  ) { }
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

    // 删除密码字段
    const { userPassword, ...userWithoutPassword } = data;
    const newData = userWithoutPassword as UserEntity;
    return newData
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit; // 计算跳过的记录数
    const [data, total] = await this.userRepository.findAndCount({
      skip, // 跳过记录数
      take: limit, // 每页记录数
      order: { createTime: 'DESC' }, // 按创建时间倒序排列
    });
    if (total === 0) {
      throw new InternalServerErrorException(`数量为0`);
    }

    return { total, data, message: '查询成功', status: 200 };
  }

  /**
   * 获取用户列表，支持分页和按角色筛选
   * @param query 查询参数，包含页码、每页条数和角色
   * @returns 返回用户列表和总数
   */
  async findUsersByRole(query: { page: number; limit: number; role?: number }) {
    const { page, limit, role } = query;
    const skip = (page - 1) * limit; // 计算跳过的记录数

    // 创建查询构建器
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    // 如果指定了角色，添加角色筛选条件
    if (role) {
      queryBuilder.andWhere('user.userAuth = :role', { role });
    }

    // 执行查询并获取结果
    const [data, total] = await queryBuilder
      .orderBy('user.createTime', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    if (total === 0) {
      return { total: 0, data: [], message: '没有找到符合条件的用户', status: 200 };
    }

    return { total, data };
  }

  async findOne(identifier: string) {
    let user: UserEntity | null = null;
    const id = typeof identifier === 'number' ? identifier : Number(identifier);
    // 尝试作为用户ID查询
    if (!isNaN(id)) {
      user = await this.userRepository.findOneBy({ userId: id });
    }

    // 如果未找到且identifier是字符串类型，尝试其他字段查询
    if (!user && typeof identifier === 'string') {
      user = await this.userRepository.findOne({
        where: [
          { userName: identifier },
          { userPhoneNumber: identifier },
          { userEmail: identifier },
        ],
      });
    }
    if (!user) {
      throw new InternalServerErrorException(`未找到匹配 ${identifier} 的记录`);
    }

    return user
  }

  async update(id: number, updateUsercenterDto: UpdateUsercenterDto) {
    const user = await this.userRepository.findOneBy({ userId: id });
    if (!user) {
      throw new InternalServerErrorException(`用户 ID 为 ${id} 的记录不存在`);
    }

    // 合并更新数据
    Object.assign(user, updateUsercenterDto);
    user.updateTime = new Date(); // 更新时间
    let newUser = await this.userRepository.save(user);

    const { userPassword, ...userWithoutPassword } = newUser;
    newUser = userWithoutPassword as UserEntity;

    return newUser;
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ userId: id });
    if (!user) {
      throw new InternalServerErrorException(`用户 ID 为 ${id} 的记录不存在`);
    }
    const data = await this.userRepository.delete(id);

    return data;
  }
}
