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
import { UsercenterService } from './usercenter.service';
import { CreateUsercenterDto } from './dto/create-usercenter.dto';
import { UpdateUsercenterDto } from './dto/update-usercenter.dto';
import { AuthGuard } from '../auth/auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { QueryUsercenterDto } from './dto/query-usercenter.dto';

@Controller('usercenter')
export class UsercenterController {
  constructor(private readonly usercenterService: UsercenterService) { }

  @Post()
  createUser(@Body() createUsercenterDto: CreateUsercenterDto) {
    return this.usercenterService.createUser(createUsercenterDto);
  }

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.usercenterService.findAll(page, limit);
  }

  /**
   * 获取用户列表，支持分页和按角色筛选
   * 需要管理员权限
   * 
   * @param query 查询参数对象
   * @returns 返回用户列表和总数
   * 
   * @example
   * GET /usercenter/list?page=1&limit=10&role=1
   */
  @Get('list')
  @UseGuards(AuthGuard, AdminGuard)
  async findUsersByRole(@Query() query: QueryUsercenterDto) {
    // 确保传递给服务方法的是所需类型
    const { page = 1, limit = 10, role } = query;
    const data = await this.usercenterService.findUsersByRole({ page, limit, role });
    // 删除密码字段
    const { data: users, ...rest } = data;
    return { ...rest, data: users.map(user => ({
      ...user,
      userPassword: undefined
    })) };
  }

  @Get(':identifier')
  async findOne(@Param('identifier') identifier: string) {
    const data = await this.usercenterService.findOne(identifier);
    const { userPassword, ...userWithoutPassword } = data;
    return userWithoutPassword;
  }

  @Patch(':id')
  @UseGuards(AuthGuard, AdminGuard)
  update(
    @Param('id') id: string,
    @Body() updateUsercenterDto: UpdateUsercenterDto,
    @Request() req,
  ) {
    return this.usercenterService.update(+id, updateUsercenterDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, AdminGuard)
  remove(@Param('id') id: string, @Request() req) {
    return this.usercenterService.remove(+id);
  }
}
