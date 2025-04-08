import { Exclude, Expose, Transform } from 'class-transformer';
import { IsNumber, IsString, IsDate } from 'class-validator';

@Exclude()
export class ArticleResponseDto {
  @Expose()
  @IsNumber({}, { message: '文章ID必须是数字' })
  articleId: number;

  @Expose()
  @IsNumber({}, { message: '用户ID必须是数字' })
  userId: number;

  @Expose()
  @IsString({ message: '文章标题必须是字符串' })
  articleTitle: string;

  @Expose()
  @IsString({ message: '作者名必须是字符串' })
  articleAuthor: string;

  @Expose()
  @IsString({ message: '文章简介必须是字符串' })
  articleIntro: string;

  @Expose()
  @IsString({ message: '文章封面链接必须是字符串' })
  articleCover: string;

  @Expose()
  @IsString({ message: '文章类型必须是字符串' })
  articleType: string;

  @Expose()
  @IsNumber({}, { message: '浏览量必须是数字' })
  articleViewCount: number;

  @Expose()
  @IsString({ message: '文章内容必须是字符串' })
  articleContent: string;

  @Expose()
  @IsDate({ message: '创建时间必须是日期格式' })
  @Transform(({ value }) => (value ? new Date(value) : null))
  createTime: Date;

  @Expose()
  @IsDate({ message: '更新时间必须是日期格式' })
  @Transform(({ value }) => (value ? new Date(value) : null))
  updateTime: Date;

  constructor(partial: Partial<ArticleResponseDto>) {
    Object.assign(this, partial);
  }
}
