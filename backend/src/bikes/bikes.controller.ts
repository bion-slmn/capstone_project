import { Controller, Post, Body, Patch, Param, Get, UseGuards, Request, Query, Delete } from '@nestjs/common';
import { BikesService } from './bikes.service';
import { Bike } from './bikes.model';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RiderRoleGuard } from '../auth/guards/rider-role.guard';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';

@UseGuards(JwtAuthGuard)
@Controller('bikes')
export class BikesController {
    constructor(private readonly bikesService: BikesService) { }

    @UseGuards(RiderRoleGuard)
    @Post()
    async createBike(@Body() data: CreateBikeDto, @Request() req): Promise<Bike> {
        const userId = req.user.userId;
        return this.bikesService.createBike(data, userId);
    }

    @Get('byId')
    async getBikeById(@Query('bikeId') bikeId: string): Promise<Bike> {
        return this.bikesService.getBikeById(bikeId);
    }

    @UseGuards(RiderRoleGuard)
    @Get('byriderId')
    async getBikesByRider(@Query('riderId') riderId: string): Promise<Bike[]> {
        return this.bikesService.getBikeByRiderId(riderId);
    }

    @UseGuards(RiderRoleGuard)
    @Patch('update/:bikeId')
    async updateBike(@Param('bikeId') bikeId: string, @Body() data: UpdateBikeDto, @Request() req): Promise<Bike> {
        return this.bikesService.updateBike(bikeId, data);
    }

    @UseGuards(RiderRoleGuard)
    @Delete('delete/:bikeId')
    async deleteBike(@Param('bikeId') bikeId: string, @Request() req): Promise<void> {
        await this.bikesService.deleteBike(bikeId);
    }

    @Get('availability/:isAvailable')
    async getBikesByAvailability(
        @Param('isAvailable') isAvailable: string,
        @Request() req
    ): Promise<Bike[]> {
        const available = isAvailable.toLowerCase() === 'true';
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;
        return this.bikesService.getBikeByAvailability(available, limit, offset);
    }
}
