import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './utils/config';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
