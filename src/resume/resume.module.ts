import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { ResumeEntity } from './entities/resume.entity';
import { UserEntity } from '../usercenter/entities/usercenter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResumeEntity, UserEntity])],
  controllers: [ResumeController],
  providers: [ResumeService],
  exports: [ResumeService],
})
export class ResumeModule {}
