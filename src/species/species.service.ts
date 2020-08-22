import { Injectable } from '@nestjs/common';
import { Species } from './interfaces/species.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpeciesEntity } from './species.entity';
import { SpeciesDto } from './dto/species.dto';
import { SpeciesRepository } from './repository/SpeciesRepository';

@Injectable()
export class SpeciesService {
  species: SpeciesDto[]

  constructor(private readonly speciesRepository: SpeciesRepository) {}


  create(species: SpeciesDto)   {
    return this.speciesRepository.createSpecies(species).then((res) => {
      return res
    }).catch((error) => {
      console.log(error)
      return "error"
    })
  }

  findAll(): Promise<SpeciesDto[]> {
    return this.speciesRepository.find();
  }

  findById(id): Promise<any> {

    return this.speciesRepository.findOne(id).then((res)=> {
      if (res) {
        return res
      } else {
        return false;
      }
      
    }).catch((error) => {
      return error
    });

   /*
   return this.speciesRepository.findOne(id).then((speciesEntities:SpeciesEntity[]) => {
      if (speciesEntities.length > 0) {
        return this.toDTO(speciesEntities[0])
      } else {
        return false
      }
      
    }).catch((error) => {
      return error
    });
    */
  }

  findOne(speciesDto:SpeciesDto): Promise<SpeciesDto[]> {
    return this.speciesRepository.find(speciesDto)
  }

  async delete(id) {
    return this.speciesRepository.delete({"id":id})
  }

  async update(id, speciesDTO) {
    return this.speciesRepository.update(id ,speciesDTO);
  }



  toDTO(entity:SpeciesEntity):SpeciesDto {  
    let properties = ["name"]
    let speciesDTO = new SpeciesDto()

    for (var i=0; i<properties.length;i++) {
      speciesDTO[properties[i]] =  entity[properties[i]] != undefined && entity[properties[i]].length > 0 ? entity[properties[i]] : ""
    }
    
    return speciesDTO
}
}