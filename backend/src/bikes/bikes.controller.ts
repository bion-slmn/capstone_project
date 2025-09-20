import { Controller, Post, Body, Patch, Param, Get, UseGuards, Request } from '@nestjs/common';
import { BikesService } from './bikes.service';
import { Bike } from './bikes.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RiderRoleGuard } from '../auth/rider-role.guard';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';

@UseGuards(JwtAuthGuard)
@Controller('bikes')
export class BikesController {
    constructor(private readonly bikesService: BikesService) { }

    @UseGuards(RiderRoleGuard)
    @Post()
    async createBike(@Body() data: CreateBikeDto, @Request() req): Promise<Bike> {
        return this.bikesService.createBike(data);
    }

    @Get(':id')
    async getBikeById(@Param('id') id: string): Promise<Bike> {
        return this.bikesService.getBikeById(id);
    }

    @UseGuards(RiderRoleGuard)
    @Get()
    async getBikesByRider(@Request() req): Promise<Bike[]> {
        return this.bikesService.getBikeByRiderId(req.user.id);
    }

    @UseGuards(RiderRoleGuard)
    @Patch(':id')
    async updateBike(@Param('id') id: string, @Body() data: UpdateBikeDto, @Request() req): Promise<Bike> {
        return this.bikesService.updateBike(id, data);
    }

    @UseGuards(RiderRoleGuard)
    @Post(':id/delete')
    async deleteBike(@Param('id') id: string, @Request() req): Promise<void> {
        await this.bikesService.deleteBike(id);
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
