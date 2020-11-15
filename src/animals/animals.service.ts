import { Injectable } from '@nestjs/common';
import { Animal } from './interfaces/animal.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnimalEntity } from './animal.entity';
import { AnimalDto } from './dto/animal.dto';
import { AnimalRepository } from './repository/AnimalRepository';
import { BreedRepository } from 'src/breed/repository/BreedRepository';
//import { PhotoRepository } from 'src/photo/repository/PhotoRepository';



@Injectable()
export class AnimalsService {

  fs = require('fs');
  animals: AnimalDto[]
  tmpPath = "./resources/tmp/"
  resourcesPath = "./resources/files/"
  mainSuffix = "_main"

  constructor(private readonly animalRepository: AnimalRepository, private readonly breedRepository: BreedRepository, /*private readonly photoRepository: PhotoRepository*/) { }


  async create(animal: AnimalDto) {
    return await this.animalRepository.createAnimal(animal)
  }

  getFiles(idAnimal): Array<string> {
    let animalFolder = this.resourcesPath + idAnimal + "/"
    let files: Array<string> = [];

    if (this.fs.existsSync(animalFolder)) {
      this.fs.readdirSync(animalFolder).forEach(file => {
        files.push(file);
      });
    }

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

  deleteFiles(idAnimal, files) {

    console.log(this.resourcesPath + idAnimal + "/" + files)

    for (let i = 0; i < files.length; i++) {

      this.fs.unlinkSync(this.resourcesPath + idAnimal + "/" + files[i])
    }

  }

  async setMainImage(idAnimal, filename) {
    let animalFolder = this.resourcesPath + idAnimal + "/";

    let files = this.getFiles(idAnimal)

    for (let i = 0; i < files.length; i++) {
      if (files[i].indexOf(this.mainSuffix)) {
        this.fs.renameSync(animalFolder + files[i], animalFolder + files[i].replace(this.mainSuffix, ""))
      }
    }

    let newMainName = this.getMainImageName(filename);

    console.log(newMainName)

    if (newMainName) {
      this.fs.renameSync(animalFolder + filename, animalFolder + newMainName);
    } else {
      return false;
    }


  }

  getMainImageName(name) {
    if (name.indexOf(this.mainSuffix) == -1) {
      let nameSplitted = name.split(".")
      if (nameSplitted.length > 1) {
        nameSplitted[nameSplitted.length - 2] = nameSplitted[nameSplitted.length - 2] + this.mainSuffix
        nameSplitted[nameSplitted.length - 1] = "." + nameSplitted[nameSplitted.length - 1]
        return nameSplitted.join("")
      } else {
        throw Error;
      }
    } else {
      return false;
    }

  }

  findAll(): Promise<AnimalEntity[]> {
    return this.animalRepository.find()
  }

  async findAvailableWithMainImage(): Promise<AnimalDto[]> {
    
    return this.animalRepository.findAvailable().then((animals) => {
      let animalsDTO = []

      for (let i = 0; i < animals.length; i++) {
        let mainImage = undefined
        let files = this.getFiles(animals[i].id);

        for (let j = 0; j < files.length; j++) {
          if (files[j].indexOf(this.mainSuffix) !== -1) {
            mainImage = files[j]
          }
        }

        if (mainImage === undefined && files.length > 0) {
          mainImage = files[0]
        }

        animalsDTO.push(new AnimalDto(animals[i].id, animals[i].name, animals[i].breed, animals[i].weight, animals[i].birthDate, animals[i].deathDate, animals[i].vaccinated, animals[i].sterilized, animals[i].sex, animals[i].state, mainImage !== undefined ? [mainImage] : []))

        //console.log("NEW ANIMAL " + JSON.stringify(new AnimalDto(animals[i].id, animals[i].name, animals[i].breed, animals[i].weight, animals[i].birthDate, animals[i].deathDate, animals[i].vaccinated, animals[i].sterilized, animals[i].sex, animals[i].state, [mainImage])))

      }

      return animalsDTO

    })

    
  }

  async findById(id): Promise<AnimalEntity> {
    return await this.animalRepository.findOne(id)
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

  findOne(animalDto: AnimalDto): Promise<AnimalEntity[]> {
    return this.animalRepository.find(animalDto)
  }

  async findAvailable(): Promise<AnimalEntity[]> {
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