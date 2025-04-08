import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { ArticleEntity } from './entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { QueryArticleDto } from './dto/query-article.dto';
import { ArticleResponseDto } from './dto/article-response.dto';
import { UserEntity } from '../usercenter/entities/usercenter.entity';

/**
 * 文章服务类
 * 提供文章的增删改查等核心业务逻辑实现
 */
@Injectable()
export class ArticleService {
    /**
     * 构造函数
     * @param articleRepository - 文章仓库实例，用于数据库操作
     */
    constructor(
        @InjectRepository(ArticleEntity)
        private readonly articleRepository: Repository<ArticleEntity>,
    ) {}

    /**
     * 创建新文章
     * @param createArticleDto - 创建文章的数据传输对象
     * @param userId - 创建文章的用户ID
     * @returns 返回创建成功的文章信息
     */
    async create(createArticleDto: CreateArticleDto, userId: number): Promise<ArticleResponseDto> {
        const article = this.articleRepository.create({
            ...createArticleDto,
            user: { userId } as UserEntity,
        });
        const savedArticle = await this.articleRepository.save(article);
        return new ArticleResponseDto(savedArticle as unknown as Partial<ArticleResponseDto>);
    }

    /**
     * 查询文章列表
     * @param query - 查询参数对象，包含分页、过滤条件等
     * @returns 返回文章列表和总数
     */
    async findAll(query: QueryArticleDto): Promise<{ items: ArticleResponseDto[]; total: number }> {
        // 解构查询参数，设置默认值
        const { page = 1, limit = 10, articleType, articleAuthor, startTime, endTime } = query;
        const skip = (page - 1) * limit;

        // 创建查询构建器
        const queryBuilder = this.articleRepository.createQueryBuilder('article');

        // 根据文章类型过滤
        if (articleType) {
            queryBuilder.andWhere('article.articleType = :articleType', { articleType });
        }

        // 根据作者过滤
        if (articleAuthor) {
            queryBuilder.andWhere('article.articleAuthor = :articleAuthor', { articleAuthor });
        }

        // 根据时间范围过滤
        if (startTime && endTime) {
            queryBuilder.andWhere('article.createTime BETWEEN :startTime AND :endTime', {
                startTime,
                endTime,
            });
        }

        // 执行查询并获取结果
        const [items, total] = await queryBuilder
            .orderBy('article.createTime', 'DESC')
            .skip(skip)
            .take(limit)
            .getManyAndCount();

        return {
            items: items.map(item => new ArticleResponseDto(item as unknown as Partial<ArticleResponseDto>)),
            total,
        };
    }

    /**
     * 查询单篇文章
     * @param id - 文章ID
     * @returns 返回文章详细信息
     * @throws NotFoundException 当文章不存在时抛出异常
     */
    async findOne(id: number): Promise<ArticleResponseDto> {
        const article = await this.articleRepository.findOne({
            where: { articleId: id },
        });

        if (!article) {
            throw new NotFoundException(`Article with ID ${id} not found`);
        }

        // 增加文章浏览量
        article.articleViewCount += 1;
        await this.articleRepository.save(article);

        return new ArticleResponseDto(article as unknown as Partial<ArticleResponseDto>);
    }

    /**
     * 更新文章
     * @param id - 文章ID
     * @param updateArticleDto - 更新文章的数据传输对象
     * @param userId - 当前操作用户的ID
     * @returns 返回更新后的文章信息
     * @throws NotFoundException 当文章不存在或用户无权限时抛出异常
     */
    async update(id: number, updateArticleDto: UpdateArticleDto, userId: number): Promise<ArticleResponseDto> {
        // 查找文章并加载用户关系
        const article = await this.articleRepository.findOne({
            where: { articleId: id },
            relations: ['user'],
        });

        if (!article) {
            throw new NotFoundException(`Article with ID ${id} not found`);
        }

        // 验证用户权限
        if (article.user.userId !== userId) {
            throw new NotFoundException('You are not authorized to update this article');
        }

        // 更新文章
        const updatedArticle = await this.articleRepository.save({
            ...article,
            ...updateArticleDto,
        });

        return new ArticleResponseDto(updatedArticle as unknown as Partial<ArticleResponseDto>);
    }

    /**
     * 删除文章
     * @param id - 文章ID
     * @param userId - 当前操作用户的ID
     * @throws NotFoundException 当文章不存在或用户无权限时抛出异常
     */
    async remove(id: number, userId: number): Promise<void> {
        // 查找文章并加载用户关系
        const article = await this.articleRepository.findOne({
            where: { articleId: id },
            relations: ['user'],
        });

        if (!article) {
            throw new NotFoundException(`Article with ID ${id} not found`);
        }

        // 验证用户权限
        if (article.user.userId !== userId) {
            throw new NotFoundException('You are not authorized to delete this article');
        }

        // 删除文章
        await this.articleRepository.remove(article);
    }
}
