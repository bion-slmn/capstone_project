import { IsOptional, IsString, IsNumber, IsBoolean, IsArray, IsDate } from 'class-validator';

export class UpdateBikeDto {
    @IsOptional()
    @IsString()
    brand?: string;

    @IsOptional()
    @IsString()
    model?: string;

    @IsOptional()
    @IsNumber()
    batteryLevel?: number;

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsBoolean()
    isAvailable?: boolean;

    @IsOptional()
    @IsNumber()
    pricePerMinute?: number;

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
