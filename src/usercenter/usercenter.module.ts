import { Module } from '@nestjs/common';
import { UsercenterService } from './usercenter.service';
import { UsercenterController } from './usercenter.controller';

@Module({
  controllers: [UsercenterController],
  providers: [UsercenterService],
})
export class UsercenterModule {}
