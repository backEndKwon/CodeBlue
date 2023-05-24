import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  // global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 페이로드와 DTO 클래스를 비교해 수신해서는 안되는 속성을 자동으로 제거하는 옵션(유효성이 검사된 객체만 수신)
      forbidNonWhitelisted: true, // 허용하지 않은 속성을 제거하는 대신 예외를 throw하는 옵션
      transform: true, // 네트워크를 통해 받는 페이로드가 DTO 클래스에 따라 지정된 개체로 자동 변환되도록 하는 옵션
    }),
  );

  // cors
  app.enableCors();

  const port = parseInt(process.env.PORT);
  await app.listen(port);
  if (process.env.MODE === 'development')
    logger.log(`서버 돌아가는 듕~ ${port}`);
}
bootstrap();