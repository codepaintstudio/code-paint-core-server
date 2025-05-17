import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-article.dto';
import { IsOptional, IsString, Length, MaxLength, IsBoolean, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  @IsOptional()
  @IsString({ message: '文章标题必须是字符串' })
  @Length(1, 100, { message: '文章标题长度必须在1-100个字符之间' })
  articleTitle?: string;

  @IsOptional()
  @IsString({ message: '作者名必须是字符串' })
  @MaxLength(20, { message: '作者名长度不能超过20个字符' })
  articleAuthor?: string;

  @IsOptional()
  @IsString({ message: '文章简介必须是字符串' })
  @Length(1, 200, { message: '文章简介长度必须在1-200个字符之间' })
  articleIntro?: string;

  @IsOptional()
  @IsString({ message: '文章封面链接必须是字符串' })
  articleCover?: string;

  @IsOptional()
  @IsString({ message: '文章类型必须是字符串' })
  articleType?: string;

  @IsOptional()
  @IsString({ message: '文章内容必须是字符串' })
  articleContent?: string;

  /**
   * 文章状态
   */
  @IsOptional()
  @IsBoolean({ message: '文章状态必须是布尔值' })
  @Type(() => Boolean)
  isActive?: boolean;

  /**
   * 开始时间
   */
  @IsOptional()
  @IsDateString({}, { message: '开始时间格式不正确，应为ISO格式的日期字符串' })
  startTime?: Date;

  /**
   * 结束时间
   */
  @IsOptional()
  @IsDateString({}, { message: '结束时间格式不正确，应为ISO格式的日期字符串' })
  endTime?: Date;
}
