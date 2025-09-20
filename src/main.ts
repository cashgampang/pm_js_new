import { NestFactory, Reflector } from '@nestjs/core';

import * as dotenv from 'dotenv';
dotenv.config();

import { AppModule } from './app.module';
import { JwtAuthGuard } from 'src/Shared/Modules/Authentication/Infrastructure/Guards/jwtAuth.guard';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
// somewhere in your initialization file

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)));

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:4173',
      'http://app.local:3000',
      'https://swb65h75-3000.asse.devtunnels.ms'
    ],
    credentials: true,
  });

  app.use(cookieParser());

  app.use((req, res, next) => {
    console.log('Incoming request:', req.method, req.url);
    next();
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  await app.listen(process.env.PORT ?? 3001, '0.0.0.0');
  console.log('Server Successfully Started');
}

bootstrap().catch((err) => {
  console.error('Bootstrap failed:', err);
});
