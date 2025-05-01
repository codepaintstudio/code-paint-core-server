import { UsercenterService } from './../usercenter/usercenter.service';
import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsercenterService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.findOne(username);

      // 直接使用用户密码进行验证
      if (user?.userPassword !== pass) {
        throw new UnauthorizedException('用户名或密码错误');
      }

      const payload = { sub: user.userId, username: user.userName };
      const refreshPayload = { sub: user.userId };

      return {
        userId: user.userId,
        access_token: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
        }),
        refresh_token: await this.jwtService.signAsync(refreshPayload, {
          expiresIn: '7d',
        }),
      };
    } catch (error) {
      // 捕获findOne方法抛出的NotFoundException异常并将其转换为UnauthorizedException
      // 这样用户名不存在和密码错误都返回相同的401状态码
      if (error instanceof NotFoundException) {
        throw new UnauthorizedException('用户名或密码错误');
      }
      throw error;
    }
  }

  async refreshToken(refresh_token: string) {
    try {
      // 如果refresh_token为空或无效格式，返回400错误
      if (!refresh_token || typeof refresh_token !== 'string') {
        throw new BadRequestException('无效的refresh_token格式');
      }
      
      // 验证token
      const decoded = await this.jwtService.verifyAsync(refresh_token);

      // 确保用户存在
      const user = await this.usersService.findOne(decoded.sub);
      if (!user) {
        throw new NotFoundException('用户不存在');
      }

      const access_token = await this.jwtService.signAsync(
        { id: decoded.sub, userName: user.userName },
        { expiresIn: '7d' },
      );

      const newRefresh_token = await this.jwtService.signAsync(
        { id: decoded.sub },
        { expiresIn: '7d' },
      );
      return { refresh_token: newRefresh_token, access_token };
    } catch (error) {
      // 区分不同类型的错误
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error; // 重新抛出原始错误
      }
      // JWT相关错误统一处理为401未授权
      throw new UnauthorizedException('refresh_token无效或已过期');
    }
  }
}
