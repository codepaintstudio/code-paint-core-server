import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';

import { UserEntity } from '../../usercenter/entities/usercenter.entity';

@Entity('article')
export class ArticleEntity {
    // id 自增
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'article_id',
    })
    articleId: number;

    // 用户ID
    @Column({
        type: 'int',
        name: 'article_user_id',
    })
    userId: number;

    // 文章标题
    @Column({
        type: 'varchar', length: 100, nullable: false,
        name: 'article_title',
    })
    articleTitle: string;

    // 作者
    @Column({
        type: 'varchar', length: 20, nullable: false,
        name: 'article_author',
        default: 'CodePaint码绘工作室',
    })
    articleAuthor: string;

    // 文章简介
    @Column({
        type: 'varchar', length: 200, nullable: false,
        name: 'article_intro',
    })
    articleIntro: string;

    // 文章封面
    @Column({
        type: 'varchar', nullable: true,
        name: 'article_cover',
    })
    articleCover: string;

    // 文章类型
    @Column({
        type: 'varchar', nullable: false,
        name: 'article_type',
        default: '原创',
    })
    articleType: string;

    // 浏览量
    @Column({
        type: 'int', nullable: false,
        name: 'article_view_count',
        default: 0
    })
    articleViewCount: number;

    // 文章内容
    @Column({
        type: 'text', nullable: false,
        name: 'article_content',
    })
    articleContent: string;

    // 创建日期
    @CreateDateColumn({
        type: 'datetime',
        name: 'create_time',
        nullable: false,
    })
    createTime: Date;

    // 更新日期
    @UpdateDateColumn({
        type: 'datetime',
        name: 'update_time',
        nullable: false,
    })
    updateTime: Date;

    // 关联用户，一个用户可以有多篇文章
    @ManyToOne(() => UserEntity, user => user.articles, { nullable: false })
    @JoinColumn({ name: 'article_user_id' })
    user: UserEntity;
}