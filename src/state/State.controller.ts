import { Controller, Get, Query, Post, Body,UseGuards,Param, Delete, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { StateDto } from './dto/state.dto';
import { AuthGuard } from '@nestjs/passport';
import { StateService } from './state.service';


@Controller("api/state")
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  async findAll(): Promise<StateDto[] | StateDto> {
      return this.stateService.findAll();  
  }

  @Get(':id')
  async findById(@Param('id') id) {
     return this.stateService.findById(id).then(function (res){
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
  async create(@Body() stateDTO:StateDto) {
    delete stateDTO.id
    return this.stateService.create(stateDTO)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id) {
    this.stateService.delete(id).then(()=>{
      console.log("Ok")
      return "Deleted State with id " + id
    }).catch(()=>{
      console.log("KO")
      return "KO"
    })
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id, @Body() stateDTO:StateDto, @Res() res:Response) {

    delete stateDTO.id

    console.log("id " + id)

    this.stateService.update(id,stateDTO).then((result)=>{
      res.status(201).json({"changedRows":result.raw.changedRows})
    }).catch((error)=>{
      res.status(555).json([error])
      return "KO"
    })
  }

  
}