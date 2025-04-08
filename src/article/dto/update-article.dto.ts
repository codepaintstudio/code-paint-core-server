import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-article.dto';
import { IsOptional, IsString, Length, MaxLength } from 'class-validator';

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
}
