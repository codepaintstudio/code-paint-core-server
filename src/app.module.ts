import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getConfig } from './utils/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsercenterModule } from './usercenter/usercenter.module';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';
let envFilePath = ['.env'];
export const IS_DEV = process.env.RUNNING_ENV !== 'prod';

if (IS_DEV) {
  envFilePath.unshift('.env.dev');
} else {
  envFilePath.unshift('.env.prod');
}
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false, // 忽视默认读取.env的文件配置
      load: [getConfig], // 加载配置文件
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
    }),
    UsercenterModule,
    AuthModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
