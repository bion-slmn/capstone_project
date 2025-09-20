import { Injectable, Logger, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Bike } from './bikes.model';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';

@Injectable()
export class BikesService {
    private readonly logger = new Logger(BikesService.name);

    constructor(
        @InjectModel(Bike)
        private bikeModel: typeof Bike,
    ) { }

    async createBike(data: CreateBikeDto): Promise<Bike> {
        try {
            const bike = await this.bikeModel.create(data as any);
            this.logger.log(`Bike created: ${bike.id}`);
            return bike;
        } catch (error) {
            this.handleError('creating bike', error);
        }
    }

    async getBikeById(id: string): Promise<Bike> {
        try {
            const bike = await this.bikeModel.findByPk(id);
            if (!bike) {
                this.logger.warn(`Bike not found: ${id}`);
                throw new NotFoundException('Bike not found');
            }
            return bike;
        } catch (error) {
            this.handleError(`fetching bike ${id}`, error);
        }
    }

    async getBikeByRiderId(riderId: string): Promise<Bike[]> {
        try {
            return await this.bikeModel.findAll({ where: { riderId } });
        } catch (error) {
            this.handleError(`fetching bikes for rider ${riderId}`, error);
        }
    }

    async getBikeByAvailability(isAvailable: boolean, limit = 10, offset = 0): Promise<Bike[]> {
        try {
            return await this.bikeModel.findAll({
                where: { isAvailable },
                limit,
                offset,
                order: [['createdAt', 'DESC']]
            });
        } catch (error) {
            this.handleError(`fetching bikes by availability ${isAvailable}`, error);
        }
    }

    async updateBike(id: string, data: UpdateBikeDto): Promise<Bike> {
        try {
            const bike = await this.getBikeById(id);
            await bike.update(data);
            this.logger.log(`Bike updated: ${id}`);
            return bike;
        } catch (error) {
            this.handleError(`updating bike ${id}`, error);
        }
    }

    async deleteBike(id: string): Promise<void> {
        try {
            const bike = await this.getBikeById(id);
            await bike.destroy();
            this.logger.log(`Bike deleted: ${id}`);
        } catch (error) {
            this.handleError(`deleting bike ${id}`, error);
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
