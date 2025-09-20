import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Booking } from './booking.model';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        SequelizeModule.forFeature([Booking]),
        AuthModule,
        UsersModule
    ],
    providers: [BookingsService],
    controllers: [BookingsController],
})
export class BookingsModule { }
