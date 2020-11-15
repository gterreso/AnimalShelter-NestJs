import { Module } from '@nestjs/common';
import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnimalRepository } from './repository/AnimalRepository';
import { SpeciesService } from 'src/species/species.service';
import { SpeciesRepository } from 'src/species/repository/SpeciesRepository';

import {  BreedService } from 'src/breed/breed.service';
import { BreedRepository } from 'src/breed/repository/BreedRepository';
//import { PhotoRepository } from 'src/photo/repository/PhotoRepository';

@Module({
  imports: [TypeOrmModule.forFeature([AnimalRepository]),TypeOrmModule.forFeature([SpeciesRepository]),TypeOrmModule.forFeature([BreedRepository]),/*TypeOrmModule.forFeature([PhotoRepository])*/],
  controllers: [AnimalsController],
  providers: [AnimalsService,SpeciesService,BreedService]
})
export class AnimalsModule {}
