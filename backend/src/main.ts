import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Sequelize } from 'sequelize-typescript';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get the Sequelize instance provided by @nestjs/sequelize
  const sequelize = app.get(Sequelize);

  // Drop all tables and re-sync the database (ONLY for dev/test!)
  await sequelize.sync({ force: true });
  console.log('Database synchronized (all tables dropped and recreated)');

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
