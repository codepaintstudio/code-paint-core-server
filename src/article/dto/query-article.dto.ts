import { IsOptional, IsInt, IsString, IsDateString, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryArticleDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: '页码必须是整数' })
    @Min(1, { message: '页码最小值为1' })
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: '每页条数必须是整数' })
    @Min(1, { message: '每页条数最小值为1' })
    @Max(100, { message: '每页条数最大值为100' })
    limit?: number = 10;

    @IsOptional()
    @IsString({ message: '文章类型必须是字符串' })
    articleType?: string;

    @IsOptional()
    @IsString({ message: '作者名必须是字符串' })
    articleAuthor?: string;

    @IsOptional()
    @IsDateString({}, { message: '开始时间格式不正确，应为ISO格式的日期字符串' })
    startTime?: string;

    @IsOptional()
    @IsDateString({}, { message: '结束时间格式不正确，应为ISO格式的日期字符串' })
    endTime?: string;
}
