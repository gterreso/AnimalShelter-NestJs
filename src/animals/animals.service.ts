import { Injectable } from '@nestjs/common';
import { Animal } from './interfaces/animal.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnimalEntity } from './animal.entity';
import { AnimalDto } from './dto/animal.dto';
import { AnimalRepository } from './repository/AnimalRepository';
import { BreedRepository } from 'src/breed/repository/BreedRepository';
import { PhotoRepository } from 'src/photo/repository/PhotoRepository';


@Injectable()
export class AnimalsService {
  fs = require('fs');
  animals: AnimalDto[]
  tmpPath = "./resources/tmp/"
  resourcesPath = "./resources/files/"

  constructor(private readonly animalRepository: AnimalRepository, private readonly breedRepository: BreedRepository, private readonly photoRepository: PhotoRepository) { }


  async create(animal: AnimalDto) {
    return await this.animalRepository.createAnimal(animal)
  }

  async getFiles(idAnimal):Promise<Array<string>> {
    let animalFolder = this.resourcesPath + idAnimal + "/"
    let files:Array<string> = [];

    this.fs.readdirSync(animalFolder).forEach(file => {
     files.push(file);
    });
    
    return files;
  }

  async saveFiles(idAnimal, files) {

    let animalFolder = this.resourcesPath + idAnimal + "/"

    if (!this.fs.existsSync(animalFolder)) {
      this.fs.mkdirSync(animalFolder)
    }

    for (let i = 0; i < files.length; i++) {
        this.fs.renameSync(files[i].path, animalFolder + files[i].originalname)
    }

  }

  deleteFiles(idAnimal: any, files: any) {
    for (let i=0; i < files.length; i++) {
      this.fs.unlinkSync(this.resourcesPath + idAnimal + "/" + files[i])
    }
    
  }


  findAll(): Promise<AnimalDto[]> {
    return this.animalRepository.find();
  }

  async findById(id): Promise<AnimalDto> {
    return await this.animalRepository.getAnimalByIdWithPhotos(id)
    /*

    return this.animalRepository.find({ "id": id }).then((animalEntities: AnimalEntity[]) => {
      if (animalEntities.length > 0) {
        console.log(animalEntities[0]);
        console.log("species " + JSON.stringify(this.toDTO(animalEntities[0],true)))
        return this.toDTO(animalEntities[0],true)
      } else {
        return new AnimalDto()
      }

    }).catch(() => {
      return new AnimalDto()
    });
    */
  }

  findOne(animalDto: AnimalDto): Promise<AnimalDto[]> {
    return this.animalRepository.find(animalDto)
  }

  async findAvailable(): Promise<AnimalDto[] | AnimalDto> {
    return this.animalRepository.findAvailable();
  }

  async delete(id) {
    return this.animalRepository.delete({ "id": id })
  }

  async update(id, animalDTO) {
    return this.animalRepository.update(id, animalDTO);
  }

  checkEmptyAndNull(element) {
    if (typeof element != "object") {
      return element != undefined && ("" + element).length > 0
    } else {
      return true
    }
  }


  //Mejorar esta mierda
  toDTO(object, withID = false): AnimalDto {
    let properties = ["name", "breed", "weight", "birthDate", "deathDate", "vaccinated", "sterilized", "sex", "state"]
    let animalDTO = new AnimalDto()

    for (var i = 0; i < properties.length; i++) {
      animalDTO[properties[i]] = this.checkEmptyAndNull(object[properties[i]]) ? object[properties[i]] : ""
    }

    if (withID) {
      animalDTO.id = object.id
    }

    return animalDTO
  }



}