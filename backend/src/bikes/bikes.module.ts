import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BikesService } from './bikes.service';
import { BikesController } from './bikes.controller';
import { Bike } from './bikes.model';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [
    AuthModule,
    UsersModule,
    SequelizeModule.forFeature([Bike])
  ],
  providers: [BikesService],
  controllers: [BikesController],
  exports: [BikesService],
})
export class BikesModule { }
