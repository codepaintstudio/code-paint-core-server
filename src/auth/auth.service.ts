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
    console.log(user);

    if (user?.userPassword !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.userId, username: user.userName };
    const refreshPayload = { sub: user.userId };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '5h',
      }),
      refresh_token: await this.jwtService.signAsync(refreshPayload, {
        expiresIn: '2d',
      }),
    };
  }

  async refreshToken(refresh_token: string) {
    try {
      const decoded = await this.jwtService.verifyAsync(refresh_token);
      console.log(decoded);

      const user = await this.usersService.findOne(decoded.sub);

      const access_token = await this.jwtService.signAsync(
        { id: decoded.sub, userName: user.userName },
        { expiresIn: '5h' },
      );

      const newRefresh_token = await this.jwtService.signAsync(
        { id: decoded.sub },
        { expiresIn: '2d' },
      );
      return { refresh_token: newRefresh_token, access_token };
    } catch {
      throw new UnauthorizedException('refresh_token已过期');
    }
  }
}
