import { Controller, Get, Query, Post, Body, UseGuards, Param, Delete, Put, Res, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { Response } from 'express';
import { AnimalDto } from './dto/animal.dto';
import { AuthGuard } from '@nestjs/passport';
import { AnimalsService } from './animals.service';



import { AnimalEntity } from '../animals/animal.entity';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('api/animal')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) { }


  @Get()
  async findAll(): Promise<AnimalEntity[]> {

    return this.animalsService.findAll();


  }

  //Ask for correctness
  @Get('available')
  async findAvailable(): Promise<AnimalEntity[]> {
    return this.animalsService.findAvailable();
  }

  @Get('available/main-image')
  async findAvailableWithMainImage(): Promise<AnimalDto[]> {
    return await this.animalsService.findAvailableWithMainImage();
  }

  @Get(':id')
  async findById(@Param('id') id): Promise<AnimalEntity> {
    return await this.animalsService.findById(id);
    // return '{"name":"Whiskas","breed":"4","weight":"","birthDate":"1998-03-04","deathDate":"2020-03-05","vaccinated":"S","sterilized":"N","sex":"F","state":2,"id":2}'
  }


  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() animalDTO: AnimalDto) {
    delete animalDTO.id

    let response = await this.animalsService.create(animalDTO)

    /*if (response) {
      return this.animalsService.findById(animalDTO.id)
    } else {
      return response
    }*/
  }


//TODO DELETE FOLDER
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id) {
    this.animalsService.delete(id).then(() => {
      console.log("Ok");
      return "This action returns a #${id} cat"
    }).catch(() => {
      console.log("KO");
      return "KO"
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id, @Body() animalDto: AnimalDto) {
    delete animalDto.id

    console.log(animalDto)

    this.animalsService.update(id, animalDto).then((result) => {
      return result
    }).catch((error) => {
      console.log("KO " + error)
      return error
    })
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('files/:id')
  async getFiles(@Param('id') idAnimal): Promise<Array<string>> {
    return this.animalsService.getFiles(idAnimal)
  }



  @UseGuards(AuthGuard('jwt'))
  @Post('files/:idAnimal')
  @UseInterceptors(FilesInterceptor('files', Infinity, { dest: "./resources/tmp", limits: { fieldSize: 50 * 1024 * 1024 } }))
  async uploadFile(@UploadedFiles() files, @Param('idAnimal') idAnimal) {
    let result = await this.animalsService.saveFiles(idAnimal, files)
    return result
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('files/:idAnimal')
  async deleteFile(@Param('idAnimal') idAnimal, @Body() body) {

    let result = await this.animalsService.deleteFiles(idAnimal, body.files)
    return result
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('files/main/:idAnimal')
  async setMainImage(@Param('idAnimal') idAnimal, @Body() body) {
    console.log(body)
    let result = await this.animalsService.setMainImage(idAnimal, body.name)
    return result
  }

}