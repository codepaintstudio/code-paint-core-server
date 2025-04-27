import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RecruitmentService } from './recruitment.service';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { UpdateRecruitmentDto } from './dto/update-recruitment.dto';
import { QueryRecruitmentDto } from './dto/query-recruitment.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RecruitmentResponseDto } from './dto/recruitment-response.dto';

/**
 * 招聘控制器
 * 处理简历投递相关的HTTP请求，包括简历的投递、查询、更新和删除等操作
 */
@Controller('recruitment')
export class RecruitmentController {
  /**
   * 构造函数
   * @param recruitmentService - 招聘服务实例
   */
  constructor(private readonly recruitmentService: RecruitmentService) {}

  /**
   * 创建新简历投递
   * 需要用户登录认证
   *
   * @param createRecruitmentDto - 创建简历投递的数据传输对象
   * @param req - HTTP请求对象，包含用户信息
   * @returns 返回创建成功的简历信息
   *
   * @example
   * POST /recruitment
   * Body: {
   *   "userId": 1,
   *   "recrType": 1,
   *   "email": "example@example.com",
   *   "phone": "13800138000",
   *   "resumeFilePath": "/uploads/resumes/resume.pdf"
   * }
   */
  @Post()
  @UseGuards(AuthGuard)
  create(
    @Body() createRecruitmentDto: CreateRecruitmentDto,
    @Request() req,
  ): Promise<RecruitmentResponseDto> {
    // 如果没有提供userId，则使用当前登录用户的ID
    if (!createRecruitmentDto.userId) {
      createRecruitmentDto.userId = req.user.sub;
    }
    return this.recruitmentService.create(createRecruitmentDto);
  }

  /**
   * 查询简历列表
   * 支持分页、按类型查找、按状态查找、按时间段查找
   * 需要管理员权限
   *
   * @param query - 查询参数对象
   * @returns 返回简历列表和总数
   *
   * @example
   * GET /recruitment?page=1&limit=10&type=1&status=1&startTime=2025-01-01&endTime=2025-12-31
   */
  @Get()
  @UseGuards(AuthGuard)
  findAll(
    @Query() query: QueryRecruitmentDto,
    @Request() req,
  ): Promise<{ items: RecruitmentResponseDto[]; total: number }> {
    return this.recruitmentService.findAll(query);
  }

  /**
   * 查询单个简历详情
   * 需要用户登录认证
   *
   * @param id - 简历ID
   * @returns 返回简历详细信息
   *
   * @example
   * GET /recruitment/1
   */
  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string): Promise<RecruitmentResponseDto> {
    return this.recruitmentService.findOne(+id);
  }

  /**
   * 更新简历信息
   * 需要用户登录认证，只有管理员可以更新
   *
   * @param id - 简历ID
   * @param updateRecruitmentDto - 更新简历的数据传输对象
   * @param req - HTTP请求对象，包含用户信息
   * @returns 返回更新后的简历信息
   *
   * @example
   * PATCH /recruitment/1
   * Body: {
   *   "officialResumeStatus": 2,
   *   "officialFeedbackInfromation": "感谢您的投递，但您的经验不符合我们的要求"
   * }
   */
  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateRecruitmentDto: UpdateRecruitmentDto,
    @Request() req,
  ): Promise<RecruitmentResponseDto> {
    return this.recruitmentService.update(
      +id,
      updateRecruitmentDto,
      req.user.sub,
    );
  }

  /**
   * 删除简历
   * 需要用户登录认证，只有管理员可以删除
   *
   * @param id - 简历ID
   * @param req - HTTP请求对象，包含用户信息
   *
   * @example
   * DELETE /recruitment/1
   */
  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string, @Request() req): Promise<void> {
    return this.recruitmentService.remove(+id, req.user.sub);
  }
}
