import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResumeTemplateEntity } from './entities/resume-template.entity';
import { CreateResumeTemplateDto } from './dto/create-resume-template.dto';
import { UpdateResumeTemplateDto } from './dto/update-resume-template.dto';
import { UserEntity } from '../usercenter/entities/usercenter.entity';

@Injectable()
export class ResumeTemplateService {
  /**
   * 构造函数
   * @param resumeTemplateRepository - 简历模板仓库，用于操作简历模板数据
   */
  constructor(
    @InjectRepository(ResumeTemplateEntity)
    private readonly resumeTemplateRepository: Repository<ResumeTemplateEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  /**
   * 创建新的简历模板
   * @param createResumeTemplateDto - 创建简历模板的请求体
   * @returns 返回创建的简历模板的信息
   */
  async create(createResumeTemplateDto: CreateResumeTemplateDto, id: number) {
    // 检查用户是否存在
    const user = await this.userRepository.findOne({
      where: { userId: id },
    });
    console.log('user', user);
    if (!user) {
      throw new NotFoundException(`用户ID ${id} 不存在`);
    }
    if (user.userAuth !== 2) {
      throw new NotFoundException(`用户无权限创建简历模板`);
    }
    const ResumeTemplate = this.resumeTemplateRepository.create({
      ...createResumeTemplateDto,
    });
    const result = await this.resumeTemplateRepository.save(ResumeTemplate);
    return result;
  }

  // 查找所有简历模板
  async findAll(query: {
    page?: number;
    limit?: number;
    style?: string;
    industry?: string;
    color?: string;
  }) {
    const { page = 1, limit = 10, style, industry, color } = query;

    // 创建查询构建器
    const queryBuilder =
      this.resumeTemplateRepository.createQueryBuilder('resumeTemplate');

    // 根据简历风格进行筛选
    if (style) {
      queryBuilder.andWhere(
        "JSON_UNQUOTE(JSON_EXTRACT(resumeTemplate.resumeTemplateContent, '$.style')) = :style",
        { style },
      );
    }

    // 根据简历行业进行筛选
    if (industry) {
      queryBuilder.andWhere(
        "JSON_UNQUOTE(JSON_EXTRACT(resumeTemplate.resumeTemplateContent, '$.industry')) = :industry",
        {
          industry,
        },
      );
    }

    // 根据简历颜色进行筛选
    if (color) {
      queryBuilder.andWhere(
        "JSON_UNQUOTE(JSON_EXTRACT(resumeTemplate.resumeTemplateContent, '$.color')) = :color",
        { color },
      );
    }

    const [items, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      items,
      total,
    };
  }

  /**
   * 查询单个简历模板
   * @param id - 简历模板id
   * @returns 返回单个简历模板的信息
   */
  async findOne(id: number) {
    const result = await this.resumeTemplateRepository.findOne({
      where: { resumeTemplateId: id },
    });

    if (!result) {
      throw new NotFoundException(`简历模板ID ${id} 不存在`);
    }

    return result;
  }

  // 更新简历模板
  async update(id: number, updateResumeTemplateDto: UpdateResumeTemplateDto) {
    const result = await this.resumeTemplateRepository.update(id, {
      ...updateResumeTemplateDto,
    });

    // 检查是否更新成功
    if (result.affected === 0) {
      throw new NotFoundException(`简历模板ID ${id} 不存在`);
    }

    return result;
  }

  /**
   * 删除简历模板
   * 需要用户登录认证
   *
   * @param id - 简历模板id
   * @returns 返回删除的简历模板的信息
   */
  async remove(id: number) {
    const result = await this.resumeTemplateRepository.delete(id);

    // 检查是否删除成功
    if (result.affected === 0) {
      throw new NotFoundException(`简历模板ID ${id} 不存在`);
    }

    return result;
  }
}
