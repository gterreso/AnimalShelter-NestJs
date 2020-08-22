import { Controller, Get, Query, Post, Body,UseGuards,Param, Delete, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { BreedDto } from './dto/breed.dto';
import { AuthGuard } from '@nestjs/passport';
import { BreedService } from './breed.service';

import { Breed } from './interfaces/breed.interface';

@Controller('api/breed')
export class BreedController {
  constructor(private readonly breedService: BreedService) {}

  @Get()
  async findAll(): Promise<BreedDto[] | BreedDto> {
      return this.breedService.findAll();  
  }

  @Get(':id')
  async findById(@Param('id') id) {
     return this.breedService.findById(id).then(function (res){
       if (res != false) {
        return res
       } else {
         return "KO"
       }
       
     }).catch((error) => {
      return error
     }) 

      
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() breedDto:BreedDto) {
    delete breedDto.id
    return this.breedService.create(breedDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id) {
    this.breedService.delete(id).then(()=>{
      console.log("Ok")
      return "Deleted Breed with id " + id
    }).catch(()=>{
      console.log("KO")
      return "KO"
    })
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id, @Body() breedDTO:BreedDto) {

    this.breedService.update(id,breedDTO).then((result)=>{
     return {"changedRows":result.raw.changedRows}
    }).catch((error)=>{
      return error
    })
  }

  
}