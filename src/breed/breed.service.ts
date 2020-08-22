import { Injectable } from '@nestjs/common';
import { Breed } from './interfaces/breed.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BreedEntity } from './breed.entity';
import { BreedDto } from './dto/breed.dto';
import { BreedRepository } from './repository/BreedRepository';

@Injectable()
export class BreedService {
  breed: BreedDto[]

  constructor(private readonly breedRepository: BreedRepository) {}


  create(breed: BreedDto)   {
    return this.breedRepository.createBreed(breed).then(function (res) {
      return res
    }).catch(function (error) {
      console.log(error)
      return "error"
    })
    
  }

  findAll(): Promise<BreedDto[]> {
    return this.breedRepository.find();
  }

  findById(id): Promise<any> {
   
   return this.breedRepository.find({"id":id}).then((breedEntities:BreedEntity[]) => {
     console.log("breed id " + id)
     console.log("breedEntities " + JSON.stringify(breedEntities))
      if (breedEntities.length > 0) {
        return breedEntities[0]
      } else {
        return false
      }
      
    }).catch((error) => {
      return error
    });
  }

  findOne(breedDto:BreedDto): Promise<BreedDto[]> {
    return this.breedRepository.find(breedDto)
  }

  async delete(id) {
    return this.breedRepository.delete({"id":id})
  }

  async update(id, breedDTO) {
    return this.breedRepository.update(id ,breedDTO);
  }



  toDTO(entity:BreedEntity):BreedDto {  
    let properties = ["species","name"]
    let breedDTO = new BreedDto()

    for (var i=0; i<properties.length;i++) {
      breedDTO[properties[i]] =  entity[properties[i]] != undefined && entity[properties[i]].length > 0 ? entity[properties[i]] : ""
    }
    
    return breedDTO
}
}