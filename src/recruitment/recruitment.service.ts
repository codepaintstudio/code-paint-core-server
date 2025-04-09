import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { RecruitmentEntity } from './entities/recruiment.entity';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { UpdateRecruitmentDto } from './dto/update-recruitment.dto';
import { QueryRecruitmentDto } from './dto/query-recruitment.dto';
import { RecruitmentResponseDto } from './dto/recruitment-response.dto';
import { UserEntity } from '../usercenter/entities/usercenter.entity';

/**
 * 招聘服务类
 * 提供简历投递的增删改查等核心业务逻辑实现
 */
@Injectable()
export class RecruitmentService {
  /**
   * 构造函数
   * @param recruitmentRepository - 简历仓库实例，用于数据库操作
   * @param userRepository - 用户仓库实例，用于数据库操作
   */
  constructor(
    @InjectRepository(RecruitmentEntity)
    private readonly recruitmentRepository: Repository<RecruitmentEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  /**
   * 创建新简历投递
   * @param createRecruitmentDto - 创建简历投递的数据传输对象
   * @returns 返回创建成功的简历信息
   */
  async create(
    createRecruitmentDto: CreateRecruitmentDto,
  ): Promise<RecruitmentResponseDto> {
    const recruitment = this.recruitmentRepository.create(createRecruitmentDto);
    const savedRecruitment = await this.recruitmentRepository.save(recruitment);
    return new RecruitmentResponseDto(savedRecruitment);
  }

  /**
   * 查询简历列表
   * @param query - 查询参数对象，包含分页、过滤条件等
   * @returns 返回简历列表和总数
   */
  async findAll(
    query: QueryRecruitmentDto,
  ): Promise<{ items: RecruitmentResponseDto[]; total: number }> {
    // 解构查询参数，设置默认值
    const {
      page = 1,
      limit = 10,
      type,
      status,
      startTime,
      endTime,
    } = query;
    const skip = (page - 1) * limit;

    // 创建查询构建器
    const queryBuilder = this.recruitmentRepository.createQueryBuilder('recruitment');

    // 根据求职类型过滤
    if (type) {
      queryBuilder.andWhere('recruitment.recrType = :type', { type });
    }

    // 根据简历状态过滤
    if (status) {
      queryBuilder.andWhere('recruitment.officialResumeStatus = :status', { status });
    }

    // 根据时间范围过滤
    if (startTime && endTime) {
      queryBuilder.andWhere(
        'recruitment.createTime BETWEEN :startTime AND :endTime',
        {
          startTime,
          endTime,
        },
      );
    }

    // 执行查询并获取结果
    const [items, total] = await queryBuilder
      .orderBy('recruitment.createTime', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      items: items.map((item) => new RecruitmentResponseDto(item)),
      total,
    };
  }

  /**
   * 查询单个简历详情
   * @param id - 简历ID
   * @returns 返回简历详细信息
   * @throws NotFoundException 当简历不存在时抛出异常
   */
  async findOne(id: number): Promise<RecruitmentResponseDto> {
    const recruitment = await this.recruitmentRepository.findOne({
      where: { officialResumeId: id },
    });

    if (!recruitment) {
      throw new NotFoundException(`简历ID ${id} 不存在`);
    }

    return new RecruitmentResponseDto(recruitment);
  }

  /**
   * 更新简历信息
   * @param id - 简历ID
   * @param updateRecruitmentDto - 更新简历的数据传输对象
   * @param userId - 当前操作用户的ID
   * @returns 返回更新后的简历信息
   * @throws NotFoundException 当简历不存在时抛出异常
   * @throws ForbiddenException 当用户无权限时抛出异常
   */
  async update(
    id: number,
    updateRecruitmentDto: UpdateRecruitmentDto,
    userId: number,
  ): Promise<RecruitmentResponseDto> {
    // 查找简历
    const recruitment = await this.recruitmentRepository.findOne({
      where: { officialResumeId: id },
    });

    if (!recruitment) {
      throw new NotFoundException(`简历ID ${id} 不存在`);
    }

    // 获取用户信息
    const user = await this.userRepository.findOne({
      where: { userId },
      select: ['userAuth'],
    });

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    // 检查权限：只有管理员可以修改
    const isAdmin = user.userAuth === 2;

    if (!isAdmin) {
      throw new ForbiddenException('您没有权限修改这份简历，只有管理员可以进行此操作');
    }

    const updatedRecruitment = await this.recruitmentRepository.save({
      ...recruitment,
      ...updateRecruitmentDto,
    });

    return new RecruitmentResponseDto(updatedRecruitment);
  }

  /**
   * 删除简历
   * @param id - 简历ID
   * @param userId - 当前操作用户的ID
   * @throws NotFoundException 当简历不存在时抛出异常
   * @throws ForbiddenException 当用户无权限时抛出异常
   */
  async remove(id: number, userId: number): Promise<void> {
    // 查找简历
    const recruitment = await this.recruitmentRepository.findOne({
      where: { officialResumeId: id },
    });

    if (!recruitment) {
      throw new NotFoundException(`简历ID ${id} 不存在`);
    }

    // 获取用户信息
    const user = await this.userRepository.findOne({
      where: { userId },
      select: ['userAuth'],
    });

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    // 检查权限：只有管理员可以删除
    const isAdmin = user.userAuth === 2;

    if (!isAdmin) {
      throw new ForbiddenException('您没有权限删除这份简历，只有管理员可以进行此操作');
    }

    // 删除简历
    await this.recruitmentRepository.remove(recruitment);
  }
}
