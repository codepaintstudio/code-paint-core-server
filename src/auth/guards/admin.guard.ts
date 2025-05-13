import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { UsercenterService } from '../../usercenter/usercenter.service';

/**
 * 管理员权限守卫
 * 用于检查用户是否具有管理员权限
 */
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly usercenterService: UsercenterService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // 确保用户已经通过了认证
    if (!user || !user.sub) {
      throw new ForbiddenException('未经授权的访问');
    }

    // 获取用户信息
    const userInfo = await this.usercenterService.findOne(user.sub);

    // 检查用户是否具有管理员权限 (userAuth === 2)
    if (userInfo.userAuth !== 2 || userInfo.userAuth !== 3 ) {
      throw new ForbiddenException('需要管理员权限');
    }

    return true;
  }
}
