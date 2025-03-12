import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getConfig, IS_DEV } from './utils/config';
import { ResponseInterceptor } from './common/response';

const config = getConfig();
const PORT = config.server.PORT || 8254;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(PORT);

  console.log('正在监听端口：', PORT);
}
bootstrap();

//在其他地方使用this.configService.get('PORT')来获取配置
