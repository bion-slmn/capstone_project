import { IsString, IsNumber, IsBoolean, IsOptional, IsArray, IsDate } from 'class-validator';

export class CreateBikeDto {
    @IsString()
    brand: string;

    @IsString()
    model: string;

    @IsNumber()
    batteryLevel: number;

    @IsString()
    location: string;

    @IsBoolean()
    isAvailable: boolean;

    @IsNumber()
    pricePerMinute: number;

    @IsOptional()
    @IsDate()
    lastServiceDate?: Date;

    @IsOptional()
    @IsString()
    assignedRiderId?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    features?: string[];
}
