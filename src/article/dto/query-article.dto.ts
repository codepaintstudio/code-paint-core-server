import { IsOptional, IsString, IsInt, IsDateString, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryArticleDto {
    @IsOptional()
    @IsInt()
    @Min(1)
    @Transform(({ value }) => parseInt(value))
    page?: number = 1;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Transform(({ value }) => parseInt(value))
    limit?: number = 10;

    @IsOptional()
    @IsString()
    articleType?: string;

    @IsOptional()
    @IsString()
    articleAuthor?: string;

    @IsOptional()
    @IsDateString()
    startTime?: string;

    @IsOptional()
    @IsDateString()
    endTime?: string;
}
