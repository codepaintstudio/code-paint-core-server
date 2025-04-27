import { Module } from '@nestjs/common';
import { ResumeTemplateService } from './resume-template.service';
import { ResumeTemplateController } from './resume-template.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumeTemplateEntity } from './entities/resume-template.entity';
import { UserEntity } from '../usercenter/entities/usercenter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResumeTemplateEntity, UserEntity])],
  controllers: [ResumeTemplateController],
  providers: [ResumeTemplateService],
  exports: [ResumeTemplateService],
})
export class ResumeTemplateModule {}
