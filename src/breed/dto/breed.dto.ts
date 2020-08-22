import { BreedEntity } from "../Breed.entity"
import { SpeciesDto } from "src/species/dto/species.dto"

export class BreedDto {
   id: number
   species:SpeciesDto
   name: string
}