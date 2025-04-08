import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ArticleResponseDto {
    @Expose()
    articleId: number;

    @Expose()
    articleTitle: string;

    @Expose()
    articleAuthor: string;

    @Expose()
    articleIntro: string;

    @Expose()
    articleCover: string;

    @Expose()
    articleType: string;

    @Expose()
    articleViewCount: number;

    @Expose()
    articleContent: string;

    @Expose()
    createTime: Date;

    @Expose()
    updateTime: Date;

    constructor(partial: Partial<ArticleResponseDto>) {
        Object.assign(this, partial);
    }
}
