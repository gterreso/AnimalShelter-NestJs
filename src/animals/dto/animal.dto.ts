import { AnimalEntity } from "../animal.entity"
import { PhotoDto } from "src/photo/photo.dto"

export class AnimalDto {
   id: number
   name: string
   breed
   weight: number
   birthDate: Date
   deathDate: Date
   vaccinated: string
   sterilized: string
   sex: string
   state
   photos:PhotoDto[]
}