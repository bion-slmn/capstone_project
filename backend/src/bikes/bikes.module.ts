import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BikesService } from './bikes.service';
import { Bike } from './bikes.model';

@Module({
  imports: [SequelizeModule.forFeature([Bike])],
  providers: [BikesService]
})
export class BikesModule { }
