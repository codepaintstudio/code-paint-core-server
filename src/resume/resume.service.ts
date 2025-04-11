import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResumeEntity } from './entities/resume.entity';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { UserEntity } from '../usercenter/entities/usercenter.entity';

/**
 * 简历服务类
 * 提供简历的增删改查操作
 */
@Injectable()
export class ResumeService {
  /**
   * 构造函数
   *
   * @param resumeRepository 简历仓库,用于操作简历数据
   * @param userRepository 用户仓库,用于操作用户数据
   */
  constructor(
    @InjectRepository(ResumeEntity)
    private readonly resumeRepository: Repository<ResumeEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  /**
   * 创建新简历
   *
   * @param createResumeDto 简历创建数据
   * @param userId 创建简历的用户ID
   * @returns 返回创建的简历
   */
  async create(createResumeDto: CreateResumeDto, resumeUserId: number) {
    const resume = this.resumeRepository.create({
      ...createResumeDto,
      resumeUserId,
    });
    const savedResume = await this.resumeRepository.save(resume);
    return savedResume;
  }
  /**
   * 查找所有简历的信息
   * @param query - 查询参数，包含分页信息
   * @returns 返回所有简历信息和总数
   */
  async findAll(query: { page?: number; limit?: number }) {
    const { page = 1, limit = 10 } = query;
    const [items, total] = await this.resumeRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      items,
      total,
    };
  }
  /**
   * 查找指定ID的简历信息
   *
   * @param id - 简历ID
   * @returns 返回指定ID的简历信息
   * @throws NotFoundException - 如果简历不存在
   * @throws ForbiddenException - 如果用户没有权限查看简历
   *
   * @example
   * GET /resume/1
   * 返回指定ID的简历信息
   */
  async findOne(id: number) {
    const resume = await this.resumeRepository.findOne({
      where: { resumeId: id },
    });

    if (!resume) {
      throw new NotFoundException(`Resume with ID ${id} not found`);
    }

    return resume;
  }

  /**
   * 更新指定ID的简历信息
   *
   * @param id - 简历ID
   * @param updateResumeDto - 更新简历的请求体
   * @param userId - 更新简历的用户ID
   * @returns 返回更新后的简历信息
   * @throws NotFoundException - 如果简历不存在
   */
  async update(id: number, updateResumeDto: UpdateResumeDto, userId: number) {
    const resume = await this.resumeRepository.findOne({
      where: { resumeId: id },
    });

    if (!resume) {
      throw new NotFoundException(`Resume with ID ${id} not found`);
    }

    // 获取用户信息
    const user = await this.userRepository.findOne({
      where: { userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // 检查用户是否有权限更新简历
    if (resume.resumeUserId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to update this resume',
      );
    }

    const updatedResume = await this.resumeRepository.save({
      ...resume,
      ...updateResumeDto,
    });

    return updatedResume;
  }

  /**
   * 删除指定ID的简历
   *
   * @param id - 简历ID
   * @param userId - 删除简历的用户ID
   * @returns 返回删除的简历信息
   * @throws NotFoundException - 如果简历不存在
   */
  async remove(id: number, userId: number) {
    const resume = await this.resumeRepository.findOne({
      where: { resumeId: id },
    });

    if (!resume) {
      throw new NotFoundException(`Resume with ID ${id} not found`);
    }

    // 获取用户信息
    const user = await this.userRepository.findOne({
      where: { userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // 检查用户是否有权限更新简历
    if (resume.resumeUserId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to update this resume',
      );
    }

    const result = await this.resumeRepository.delete(id);

    // 检查删除操作是否成功
    if (result.affected === 0) {
      throw new NotFoundException(`Resume with ID ${id} not found`);
    }

    return result;
  }
}
