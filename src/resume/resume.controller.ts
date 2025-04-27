import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  Request,
} from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { AuthGuard } from '../auth/auth.guard';

/**
 * 简历控制器
 * 处理简历相关的请求
 */
@Controller('resume')
export class ResumeController {
  /**
   * 构造函数
   * @param resumeService - 简历服务实例
   */
  constructor(private readonly resumeService: ResumeService) {}

  /**
   * 创建简历信息
   * 需要用户登录认证
   *
   * @param createResumeDto - 创建简历的请求体
   * @param req - HTTP 请求对象，包含用户信息
   * @returns 返回创建成功的简历信息
   */
  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createResumeDto: CreateResumeDto, @Req() req) {
    return this.resumeService.create(createResumeDto, req.user.sub);
  }

  /**
   * 获取所有简历信息
   * 支持分页查询
   * 需要用户登录认证
   *
   * @param query - 查询参数，包含分页信息
   * @returns 返回所有简历信息
   *
   * @example
   * GET /resume?page=1&limit=10
   * 返回第1页，每页10条简历信息
   */
  @Get()
  @UseGuards(AuthGuard)
  findAll(
    @Request() req,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.resumeService.findAll(req.user.sub, {
      page,
      limit,
    });
  }

  /**
   * 获取指定ID的简历信息
   * 需要用户登录认证
   *
   * @param id - 简历ID
   * @returns 返回指定ID的简历信息
   *
   * @example
   * GET /resume/1
   * 返回ID为1的简历信息
   */
  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.resumeService.findOne(+id);
  }

  /**
   * 更新指定ID的简历信息
   * 需要用户登录认证
   *
   * @param id - 简历ID
   * @param updateResumeDto - 更新简历的请求体
   * @param req - HTTP 请求对象，包含用户信息
   * @returns 返回更新成功的简历信息
   *
   * @example
   * PATCH /resume/1
   * 更新ID为1的简历信息
   */
  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateResumeDto: UpdateResumeDto,
    @Request() req,
  ) {
    return this.resumeService.update(+id, updateResumeDto, req.user.sub);
  }

  /**
   * 删除简历
   * 需要用户登录认证
   *
   * @param id - 要删除简历的ID
   * @param req - 请求对象，用于获取用户信息
   * @returns 删除成功的消息
   *
   * @example
   * DELETE /resume/1
   * 删除ID为1的简历
   */
  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string, @Request() req) {
    return this.resumeService.remove(+id, req.user.sub);
  }
}
