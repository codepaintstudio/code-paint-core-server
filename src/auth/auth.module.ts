import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsercenterModule } from 'src/usercenter/usercenter.module';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { AdminGuard } from './guards/admin.guard';

@Module({
  imports: [
    UsercenterModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AdminGuard],
  exports: [AuthService, AdminGuard],
})
export class AuthModule {}
