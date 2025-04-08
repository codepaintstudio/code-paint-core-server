import {
  IsString,
  IsNotEmpty,
  IsOptional,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateArticleDto {
  @IsString({ message: '文章标题必须是字符串' })
  @IsNotEmpty({ message: '文章标题不能为空' })
  @Length(1, 100, { message: '文章标题长度必须在1-100个字符之间' })
  articleTitle: string;

  @IsString({ message: '作者名必须是字符串' })
  @IsOptional()
  @MaxLength(20, { message: '作者名长度不能超过20个字符' })
  articleAuthor?: string;

  @IsString({ message: '文章简介必须是字符串' })
  @IsNotEmpty({ message: '文章简介不能为空' })
  @Length(1, 200, { message: '文章简介长度必须在1-200个字符之间' })
  articleIntro: string;

  @IsString({ message: '文章封面链接必须是字符串' })
  @IsOptional()
  articleCover?: string;

  @IsString({ message: '文章类型必须是字符串' })
  @IsOptional()
  articleType?: string;

  @IsString({ message: '文章内容必须是字符串' })
  @IsNotEmpty({ message: '文章内容不能为空' })
  articleContent: string;
}
