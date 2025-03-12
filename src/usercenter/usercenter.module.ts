import { Module } from '@nestjs/common';
import { UsercenterService } from './usercenter.service';
import { UsercenterController } from './usercenter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/usercenter.entity';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsercenterController],
  providers: [UsercenterService],
})
export class UsercenterModule {}
