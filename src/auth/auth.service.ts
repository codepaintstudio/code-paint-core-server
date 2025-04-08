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
    console.log(username, pass);

    const user = await this.usersService.findOne(username);
    const data = user?.data;
    console.log(data, user);

    if (data?.userPassword !== pass) {
      throw new UnauthorizedException();
    }
    // const { userPassword, ...result } = data;
    const payload = { sub: data.userId, username: data.userName };
    const refreshPayload = { sub: data.userId };
    
    return {
      code: 200,
      message: '登录成功',
      success: true,
      data: {
        access_token: await this.jwtService.signAsync(payload, {
          expiresIn: '5h',
        }),
        refresh_token: await this.jwtService.signAsync(refreshPayload, {
          expiresIn: '2d',
        }),
      },
    };
  }

  async refreshToken(refresh_token: string) {
    try {
      const decoded = await this.jwtService.verifyAsync(refresh_token);
      console.log(decoded);

      const { data } = await this.usersService.findOne(decoded.id);

      const access_token = await this.jwtService.signAsync(
        { id: decoded.id, userName: data.userName },
        { expiresIn: '5h' },
      );

      const newRefresh_token = await this.jwtService.signAsync(
        { id: decoded.id },
        { expiresIn: '2d' },
      );
      return {
        data: { refresh_token: newRefresh_token, access_token },
        code: 200,
        message: '刷新成功',
        success: true,
      };
    } catch {
      throw new UnauthorizedException('refresh_token已过期');
    }
  }
}
