import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { UsercenterService } from '../../usercenter/usercenter.service';

@Injectable()
export class SuperAdminGuard implements CanActivate {
  constructor(private readonly usercenterService: UsercenterService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // 确保用户已认证（例如 JWT 解析成功）
    // 确保用户已经通过了认证
    if (!user || !user.sub) {
      throw new ForbiddenException('未经授权的访问');
    }

    // 获取用户信息
    const userInfo = await this.usercenterService.findOne(user.sub);

    // 检查是否为超级管理员
    if (userInfo.userAuth !== 3) {
      throw new ForbiddenException('需要超级管理员权限');
    }

    return true;
  }
}
