import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { QueryArticleDto } from './dto/query-article.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ArticleResponseDto } from './dto/article-response.dto';

/**
 * 文章控制器
 * 处理文章相关的HTTP请求，包括文章的增删改查等操作
 */
@Controller('article')
export class ArticleController {
    /**
     * 构造函数
     * @param articleService - 文章服务实例
     */
    constructor(private readonly articleService: ArticleService) { }

    /**
     * 创建新文章
     * 需要用户登录认证
     * 
     * @param createArticleDto - 创建文章的数据传输对象
     * @param req - HTTP请求对象，包含用户信息
     * @returns 返回创建成功的文章信息
     * 
     * @example
     * POST /article
     * Body: {
     *   "articleTitle": "文章标题",
     *   "articleIntro": "文章简介",
     *   "articleContent": "文章内容",
     *   "articleType": "原创"
     * }
     */
    @Post()
    @UseGuards(AuthGuard)
    create(@Body() createArticleDto: CreateArticleDto, @Request() req): Promise<ArticleResponseDto> {
        return this.articleService.create(createArticleDto, req.user.userId);
    }

    /**
     * 查询文章列表
     * 支持分页、按类型查找、按作者查找、按时间段查找
     * 
     * @param query - 查询参数对象
     * @returns 返回文章列表和总数
     * 
     * @example
     * GET /article?page=1&limit=10&articleType=原创&articleAuthor=作者名&startTime=2025-01-01&endTime=2025-12-31
     */
    @Get()
    findAll(@Query() query: QueryArticleDto): Promise<{ items: ArticleResponseDto[]; total: number }> {
        return this.articleService.findAll(query);
    }

    /**
     * 查询单篇文章
     * 
     * @param id - 文章ID
     * @returns 返回文章详细信息
     * 
     * @example
     * GET /article/1
     */
    @Get(':id')
    findOne(@Param('id') id: string): Promise<ArticleResponseDto> {
        return this.articleService.findOne(+id);
    }

    /**
     * 更新文章
     * 需要用户登录认证，只有文章作者可以更新
     * 
     * @param id - 文章ID
     * @param updateArticleDto - 更新文章的数据传输对象
     * @param req - HTTP请求对象，包含用户信息
     * @returns 返回更新后的文章信息
     * 
     * @example
     * PATCH /article/1
     * Body: {
     *   "articleTitle": "新标题",
     *   "articleContent": "新内容"
     * }
     */
    @Patch(':id')
    @UseGuards(AuthGuard)
    update(
        @Param('id') id: string,
        @Body() updateArticleDto: UpdateArticleDto,
        @Request() req,
    ): Promise<ArticleResponseDto> {
        return this.articleService.update(+id, updateArticleDto, req.user.userId);
    }

    /**
     * 删除文章
     * 需要用户登录认证，只有文章作者可以删除
     * 
     * @param id - 文章ID
     * @param req - HTTP请求对象，包含用户信息
     * 
     * @example
     * DELETE /article/1
     */
    @Delete(':id')
    @UseGuards(AuthGuard)
    remove(@Param('id') id: string, @Request() req): Promise<void> {
        return this.articleService.remove(+id, req.user.userId);
    }
}
