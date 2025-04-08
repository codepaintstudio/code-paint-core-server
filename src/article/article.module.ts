import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleEntity } from './entities/article.entity';
import { UserEntity } from '../usercenter/entities/usercenter.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ArticleEntity, UserEntity]),
    ],
    controllers: [ArticleController],
    providers: [ArticleService],
    exports: [ArticleService],
})
export class ArticleModule {}
