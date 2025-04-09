import { Module } from '@nestjs/common';
import { ResumeTemplateService } from './resume-template.service';
import { ResumeTemplateController } from './resume-template.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumeTemplateEntity } from './entities/resume-template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResumeTemplateEntity])],
  controllers: [ResumeTemplateController],
  providers: [ResumeTemplateService],
  exports: [ResumeTemplateService],
})
export class ResumeTemplateModule {}
