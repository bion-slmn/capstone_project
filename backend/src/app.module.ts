
import * as dotenv from 'dotenv';
dotenv.config();
import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BikesController } from './bikes/bikes.controller';
import { BikesModule } from './bikes/bikes.module';
import { BookingsModule } from './bookings/bookings.module';
import { User } from './users/models/user.model';
import { Client, Rider } from './users/models';
import { Bike } from './bikes/bikes.model';
import { Booking } from './bookings/booking.model';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT') ?? '5432', 10),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadModels: true, // Set to false in production!
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    BikesModule,
    BookingsModule,
  ],
  controllers: [AppController, BikesController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule { }
