import { NestFactory } from '@nestjs/core';
import { AuthModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule, { cors: true });
	const port = process.env.PORT || 3000;
	await app.listen(port);
}
bootstrap();