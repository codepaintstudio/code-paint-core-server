import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateArticleDto {
    @IsString()
    @IsNotEmpty()
    articleTitle: string;

    @IsString()
    @IsOptional()
    articleAuthor?: string;

    @IsString()
    @IsNotEmpty()
    articleIntro: string;

    @IsString()
    @IsOptional()
    articleCover?: string;

    @IsString()
    @IsOptional()
    articleType?: string;

    @IsString()
    @IsNotEmpty()
    articleContent: string;
}
