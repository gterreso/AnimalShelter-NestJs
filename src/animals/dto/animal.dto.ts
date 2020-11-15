import { AnimalEntity } from "../animal.entity"
//import { PhotoDto } from "src/photo/photo.dto"

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
   photos:string[]


   constructor(
      id?: number,
      name?: string,
      breed?,
      weight?: number,
      birthDate?: Date,
      deathDate?: Date,
      vaccinated?: string,
      sterilized?: string,
      sex?: string,
      state?,
      photos?:string[]
      ) {

         this.id = id || 0
         this.name = name || ""
         this.breed = breed || ""
         this.weight = weight || 0
         this.birthDate = birthDate || new Date()
         this.deathDate = deathDate || new Date()
         this.vaccinated = vaccinated || ""
         this.sterilized = sterilized || ""
         this.sex = sex || ""
         this.state = state || ""
         this.photos = photos || []

   }

  
   //photos:PhotoDto[]
}