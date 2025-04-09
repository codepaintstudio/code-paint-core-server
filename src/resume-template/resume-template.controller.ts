import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ResumeTemplateService } from './resume-template.service';
import { CreateResumeTemplateDto } from './dto/create-resume-template.dto';
import { UpdateResumeTemplateDto } from './dto/update-resume-template.dto';
import { AuthGuard } from '../auth/auth.guard';

/**
 * 简历模板控制器
 * 处理简历模板相关的http请求，如创建、查询、更新、删除简历模板
 */
@Controller('resumetemplate')
export class ResumeTemplateController {
  /**
   * 构造函数
   * @param resumeTemplateService 简历模板服务
   */
  constructor(private readonly resumeTemplateService: ResumeTemplateService) {}

  /**
   * 创建新的简历模板
   * 需要用户登录认证权限
   *
   * @param createResumeTemplateDto 简历模板创建请求体
   * @returns 返回创建的简历模板信息
   */
  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createResumeTemplateDto: CreateResumeTemplateDto) {
    return this.resumeTemplateService.create(createResumeTemplateDto);
  }

  /**
   * 获取所有简历模板
   * 支持分页、按类型查找、按作者查找、按时间段查找
   * @param query - 查询参数对象
   * @returns 返回所有简历模板列表和总数
   */
  @Get()
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('style') style?: string,
    @Query('industry') industry?: string,
    @Query('color') color?: string,
  ) {
    return this.resumeTemplateService.findAll({
      page,
      limit,
      style,
      industry,
      color,
    });
  }

  /**
   * 获取单个简历模板
   *
   * @param id - 简历模板id
   * @returns 返回单个简历模板信息
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resumeTemplateService.findOne(+id);
  }

  /**
   * 更新简历模板
   * 需要用户登录认证权限
   *
   * @param id - 简历模板id
   * @param updateResumeTemplateDto - 简历模板更新请求体
   * @returns 返回更新后的简历模板信息
   */
  @Patch(':id')
  @UseGuards(AuthGuard) // 需要用户登录认证权限
  update(
    @Param('id') id: string,
    @Body() updateResumeTemplateDto: UpdateResumeTemplateDto,
  ) {
    return this.resumeTemplateService.update(+id, updateResumeTemplateDto);
  }

  /**
   * 删除简历模板
   * 需要用户登录认证权限
   *
   * @param id - 简历模板id
   * @returns 返回删除的简历模板信息
   */
  @Delete(':id')
  @UseGuards(AuthGuard) // 需要用户登录认证权限
  remove(@Param('id') id: string) {
    return this.resumeTemplateService.remove(+id);
  }
}
