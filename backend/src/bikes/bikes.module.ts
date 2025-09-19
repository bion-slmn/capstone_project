import { Module } from '@nestjs/common';
import { BikesService } from './bikes.service';

@Module({
  providers: [BikesService]
})
export class BikesModule {}
