import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getConfig } from './utils/config';
import { GlobalExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

const config = getConfig() as { server: { PORT?: number } };
const PORT = config.server.PORT || 8543;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalFilters(new GlobalExceptionFilter()); 
    app.useGlobalPipes(new ValidationPipe()); 
    app.setGlobalPrefix('api');

    await app.listen(PORT);
    console.log('正在监听端口：', PORT);
  } catch (error) {
    console.error('应用启动失败:', error);
    process.exit(1);
  }
}

void bootstrap();

//在其他地方使用this.configService.get('PORT')来获取配置
