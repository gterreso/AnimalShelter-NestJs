import { Module } from '@nestjs/common';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SpeciesRepository } from './repository/SpeciesRepository';

@Module({
  imports: [TypeOrmModule.forFeature([SpeciesRepository])],
  controllers: [SpeciesController],
  providers: [SpeciesService]
})
export class SpeciesModule {}
