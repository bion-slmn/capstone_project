import { Injectable, Logger, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Bike } from './bikes.model';

@Injectable()
export class BikesService {
    private readonly logger = new Logger(BikesService.name);

    constructor(
        @InjectModel(Bike)
        private bikeModel: typeof Bike,
    ) { }

    async createBike(data: Partial<Bike>): Promise<Bike> {
        try {
            const bike = await this.bikeModel.create(data);
            this.logger.log(`Bike created: ${bike.id}`);
            return bike;
        } catch (error) {
            this.logger.error('Error creating bike', error.stack);
            throw new InternalServerErrorException('Failed to create bike');
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
            this.logger.error(`Error fetching bike: ${id}`, error.stack);
            throw new InternalServerErrorException('Failed to fetch bike');
        }
    }

    async getBikeByRiderId(riderId: string): Promise<Bike[]> {
        try {
            return await this.bikeModel.findAll({ where: { riderId } });
        } catch (error) {
            this.logger.error('Error fetching bikes', error.stack);
            throw new InternalServerErrorException('Failed to fetch bikes');
        }
    }

    async updateBike(id: string, data: Partial<Bike>): Promise<Bike> {
        try {
            const bike = await this.getBikeById(id);
            await bike.update(data);
            this.logger.log(`Bike updated: ${id}`);
            return bike;
        } catch (error) {
            this.logger.error(`Error updating bike: ${id}`, error.stack);
            throw new InternalServerErrorException('Failed to update bike');
        }
    }

    async deleteBike(id: string): Promise<void> {
        try {
            const bike = await this.getBikeById(id);
            await bike.destroy();
            this.logger.log(`Bike deleted: ${id}`);
        } catch (error) {
            this.logger.error(`Error deleting bike: ${id}`, error.stack);
            throw new InternalServerErrorException('Failed to delete bike');
        }
    }
}
