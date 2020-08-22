import { Injectable } from '@nestjs/common';
import { State } from './interfaces/state.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StateEntity } from './state.entity';
import { StateDto } from './dto/state.dto';
import { StateRepository } from './repository/StateRepository';

@Injectable()
export class StateService {
  state: StateDto[]

  constructor(private readonly stateRepository: StateRepository) {}


  create(state: StateDto)   {
    return this.stateRepository.createState(state).then(function (res) {
      return res
    }).catch(function (error) {
      console.log(error)
      return "error"
    })
    
  }

  findAll(): Promise<StateDto[]> {
    return this.stateRepository.find();
  }

  findById(id): Promise<any> {
   
   return this.stateRepository.find({"id":id}).then((stateEntities:StateEntity[]) => {
     console.log("state id " + id)
     console.log("stateEntities " + JSON.stringify(stateEntities))
      if (stateEntities.length > 0) {
        return stateEntities[0]
      } else {
        return false
      }
      
    }).catch((error) => {
      return error
    });
  }

  findOne(stateDto:StateDto): Promise<StateDto[]> {
    return this.stateRepository.find(stateDto)
  }

  async delete(id) {
    return this.stateRepository.delete({"id":id})
  }

  async update(id, stateDTO) {
    return this.stateRepository.update(id ,stateDTO);
  }



  toDTO(entity:StateEntity):StateDto {  
    let properties = ["name"]
    let stateDTO = new StateDto()

    for (var i=0; i<properties.length;i++) {
      stateDTO[properties[i]] =  entity[properties[i]] != undefined && entity[properties[i]].length > 0 ? entity[properties[i]] : ""
    }
    
    return stateDTO
}
}