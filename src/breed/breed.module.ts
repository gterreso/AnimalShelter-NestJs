import { Module } from '@nestjs/common';
import { BreedController } from './breed.controller';
import { BreedService } from './breed.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BreedRepository } from './repository/BreedRepository';

@Module({
  imports: [TypeOrmModule.forFeature([BreedRepository])],
  controllers: [BreedController],
  providers: [BreedService]
})
export class BreedModule {}
