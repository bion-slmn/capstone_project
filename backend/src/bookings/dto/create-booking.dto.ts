import { IsUUID, IsDateString, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  clientId: string;

  @IsUUID()
  riderId: string;

  @IsString()
  bikeId: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime?: string;

  @IsString()
  status: string;
}
