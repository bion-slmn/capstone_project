import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Booking } from './booking.model';

@Module({
    imports: [SequelizeModule.forFeature([Booking])],
    providers: [],
    controllers: [],
})
export class BookingsModule { }
