import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { RolesGuard } from './roles/roles.guard';
import { JwtService } from '@nestjs/jwt';
import { HttpExceptionFilter } from './http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalGuards(
    new RolesGuard(new Reflector(),
      new JwtService()));
  await app.listen(3000);
}
bootstrap();
