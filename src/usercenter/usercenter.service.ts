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
    // 验证密码是否匹配
    if (
      createUsercenterDto.userPassword !== createUsercenterDto.confirmPassword
    ) {
      throw new BadRequestException('两次输入的密码不匹配');
    }

    // 检查用户名是否已存在
    const existingUser = await this.userRepository.findOne({
      where: [{ userName: createUsercenterDto.userName }],
    });
    if (existingUser) {
      throw new BadRequestException('用户名已存在');
    }

    // 检查邮箱是否已存在
    const existingEmail = await this.userRepository.findOne({
      where: [{ userEmail: createUsercenterDto.userEmail }],
    });
    if (existingEmail) {
      throw new BadRequestException('邮箱已被注册');
    }

    await validateOrReject(createUsercenterDto);

    // 创建新用户，设置默认值
    const { confirmPassword, ...userData } = createUsercenterDto;
    const newUser = this.userRepository.create({
      ...userData,
      userAuth: 1, // 默认为普通用户
      userStatus: 1, // 默认为正常状态
      sex: userData.sex || 0, // 默认为0（未知）
      createTime: new Date(),
      updateTime: new Date(),
      createBy: createUsercenterDto.userName, // 创建人为用户自己
      updateBy: createUsercenterDto.userName, // 更新人为用户自己
    });

    if (!newUser) {
      throw new BadRequestException('创建失败,请检查参数');
    }

    const data = await this.userRepository.save(newUser);

    // 删除密码字段
    const { userPassword, ...userWithoutPassword } = data;
    const newData = userWithoutPassword as UserEntity;
    return newData;
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
  async findUsersByRole(query: {
    page: number;
    limit: number;
    role?: number;
    sex?: number;
  }) {
    const { page, limit, role, sex } = query;
    const skip = (page - 1) * limit; // 计算跳过的记录数

    // 创建查询构建器
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    // 如果指定了角色，添加角色筛选条件
    if (role) {
      queryBuilder.andWhere('user.userAuth = :role', { role });
    }

    // 如果指定了性别，添加性别筛选条件
    if (sex !== undefined) {
      queryBuilder.andWhere('user.sex = :sex', { sex });
    }

    // 执行查询并获取结果
    const [data, total] = await queryBuilder
      .orderBy('user.createTime', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    if (total === 0) {
      return {
        total: 0,
        data: [],
        message: '没有找到符合条件的用户',
        status: 200,
      };
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

    return user;
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
