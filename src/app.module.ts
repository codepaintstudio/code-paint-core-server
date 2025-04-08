import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
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
    TypeOrmModule.forRoot({
      type: 'mysql', //数据库类型
      username: 'CPCentralServer', //账号
      password: 'cphouduan5400', //密码
      host: '47.109.193.161', //host
      port: 3306, //
      database: 'cpcentralserver', //库名
      entities: [__dirname + '/**/*.entity{.ts,.js}'], //实体文件
      synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库
      retryDelay: 500, //重试连接数据库间隔
      retryAttempts: 10, //重试连接数据库的次数
      autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
    }),
    UsercenterModule,
    AuthModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
