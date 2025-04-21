import { UsercenterService } from './../usercenter/usercenter.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsercenterService,
    private jwtService: JwtService,
  ) { }

  async signIn(username: string, pass: string): Promise<any> {

    const user = await this.usersService.findOne(username);

    // 直接使用用户密码进行验证
    if (user?.userPassword !== pass) {
      throw new UnauthorizedException();
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
  }

  async refreshToken(refresh_token: string) {
    try {
      const decoded = await this.jwtService.verifyAsync(refresh_token);

      const user = await this.usersService.findOne(decoded.sub);

      const access_token = await this.jwtService.signAsync(
        { id: decoded.sub, userName: user.userName },
        { expiresIn: '7d' },
      );

      const newRefresh_token = await this.jwtService.signAsync(
        { id: decoded.sub },
        { expiresIn: '7d' },
      );
      return { refresh_token: newRefresh_token, access_token };
    } catch {
      throw new UnauthorizedException('refresh_token已过期');
    }
  }
}
