import { Injectable, Logger, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Booking } from './booking.model';

@Injectable()
export class BookingsService {
    private readonly logger = new Logger(BookingsService.name);

    constructor(
        @InjectModel(Booking)
        private bookingModel: typeof Booking,
    ) { }

    async createBooking(data: Partial<Booking>): Promise<Booking> {
        try {
            const booking = await this.bookingModel.create(data);
            this.logger.log(`Booking created: ${booking.id}`);
            return booking;
        } catch (error) {
            this.handleError('creating booking', error);
        }
    }

    async updateBookingStatus(id: string, status: string): Promise<Booking> {
        try {
            const booking = await this.bookingModel.findByPk(id);
            if (!booking) {
                this.logger.warn(`Booking not found: ${id}`);
                throw new NotFoundException('Booking not found');
            }
            booking.status = status;
            await booking.save();
            this.logger.log(`Booking status updated: ${id} -> ${status}`);
            return booking;
        } catch (error) {
            this.handleError(`updating booking status for ${id}`, error);
        }
    }

    async findBookingsByRiderId(riderId: string): Promise<Booking[]> {
        try {
            const bookings = await this.bookingModel.findAll({
                where: { riderId },
                order: [['startTime', 'DESC']],
                attributes: ['id', 'clientId', 'riderId', 'bikeId', 'startTime', 'endTime', 'status']
            });
            this.logger.log(`Found ${bookings.length} bookings for rider: ${riderId}`);
            return bookings;
        } catch (error) {
            this.handleError(`finding bookings for rider ${riderId}`, error);
        }
    }

    async findBookingsByClientId(clientId: string): Promise<Booking[]> {
        try {
            const bookings = await this.bookingModel.findAll({
                where: { clientId },
                order: [['startTime', 'DESC']],
                attributes: ['id', 'clientId', 'riderId', 'bikeId', 'startTime', 'endTime', 'status']
            });
            this.logger.log(`Found ${bookings.length} bookings for client: ${clientId}`);
            return bookings;
        } catch (error) {
            this.handleError(`finding bookings for client ${clientId}`, error);
        }
    }

    /**
     * Centralized error handler for service methods
     */
    private handleError(action: string, error: any): never {
        this.logger.error(`Error ${action}: ${error.message}`, error.stack);
        throw new InternalServerErrorException(`Failed to ${action}`);
    }
}
