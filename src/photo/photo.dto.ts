import { PhotoEntity } from "./photo.entity"
import { AnimalDto } from "src/animals/dto/animal.dto";

export class PhotoDto {
   id: number;
   resource: string; 
   mainPhoto: string;
   animal: AnimalDto;
 
}