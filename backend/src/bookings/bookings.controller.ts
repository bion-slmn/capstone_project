import { Controller, Post, Body, Patch, Param, Get, BadRequestException, UseGuards, Request } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Booking } from './booking.model';
import { CreateBookingDto } from './dto/create-booking.dto';
import { ClientRoleGuard } from '../auth/client-role.guard';

@Controller('bookings')
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) { }

    @UseGuards(ClientRoleGuard)
    @Post()
    async createBooking(@Body() createBookingDto: CreateBookingDto, @Request() req): Promise<Booking> {
        const bookingData = {
            ...createBookingDto,
            clientId: req.user.id,
            startTime: new Date(createBookingDto.startTime),
            endTime: createBookingDto.endTime ? new Date(createBookingDto.endTime) : undefined
        };
        return this.bookingsService.createBooking(bookingData);
    }

    @UseGuards(ClientRoleGuard)
    @Patch(':id/status')
    async updateBookingStatus(
        @Param('id') id: string,
        @Body('status') status: string,
        @Request() req
    ): Promise<Booking> {
        if (!status) {
            throw new BadRequestException('Status is required');
        }
        // Optionally, you can check if the booking belongs to the client here
        return this.bookingsService.updateBookingStatus(id, status);
    }

    @Get('rider/:riderId')
    async getBookingsByRider(@Param('riderId') riderId: string): Promise<Booking[]> {
        return this.bookingsService.findBookingsByRiderId(riderId);
    }

    @Get('client/:clientId')
    async getBookingsByClient(@Param('clientId') clientId: string): Promise<Booking[]> {
        return this.bookingsService.findBookingsByClientId(clientId);
    }
}
