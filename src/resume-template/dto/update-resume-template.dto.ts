import { PartialType } from '@nestjs/mapped-types';
import { CreateResumeTemplateDto } from './create-resume-template.dto';
import { IsJSON, IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateResumeTemplateDto extends PartialType(
  CreateResumeTemplateDto,
) {
  @IsOptional()
  @IsString({ message: '简历模板名称必须是字符串' })
  resumeTemplateName?: string;

  @IsOptional()
  @IsObject({ message: '简历模板内容必须是对象' })
  resumeTemplateContent?: object;
}
