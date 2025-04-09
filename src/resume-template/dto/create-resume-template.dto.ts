import { IsJSON, IsNotEmpty, IsObject, IsString } from 'class-validator';
export class CreateResumeTemplateDto {
  @IsString({ message: '简历模板名称必须为字符串' })
  @IsNotEmpty({ message: '简历模板名称不能为空' })
  resumeTemplateName: string;

  @IsObject({ message: '简历模板内容必须为对象' })
  @IsNotEmpty({ message: '简历模板内容不能为空' })
  resumeTemplateContent: object;
}
