import { Controller, Get, Query, Post, Body,UseGuards,Param, Delete, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { SpeciesDto } from './dto/species.dto';
import { AuthGuard } from '@nestjs/passport';
import { SpeciesService } from './species.service';

import { Species } from './interfaces/species.interface';

@Controller('api/species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Get()
  async findAll(): Promise<SpeciesDto[] | SpeciesDto> {
      return this.speciesService.findAll();  
  }

  @Get(':id')
  async findById(@Param('id') id, @Res() res:Response) {
     this.speciesService.findById(id).then(function (species){
      res.json(species)
     }).catch((error) => {
      res.status(500).json([error])
     }) 

      
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() speciesDTO:SpeciesDto) {
    delete speciesDTO.id
    return this.speciesService.create(speciesDTO)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id) {
    this.speciesService.delete(id).then(()=>{
      console.log("Ok")
      return "Deleted Species with id " + id
    }).catch(()=>{
      console.log("KO")
      return "KO"
    })
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id, @Body() speciesDto:SpeciesDto, @Res() res:Response) {

    delete speciesDto.id

    this.speciesService.update(id,speciesDto).then((result)=>{
      res.status(201).json({"changedRows":result.raw.changedRows})
    }).catch((error)=>{
      res.status(555).json([error])
      return "KO"
    })
  }

  
}