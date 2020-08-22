import { BreedEntity } from '../breed.entity';
import { EntityRepository, Repository } from 'typeorm';
import { BreedDto } from '../dto/breed.dto';

@EntityRepository(BreedEntity)
export class BreedRepository extends Repository<BreedEntity> {

    async createBreed(breedDto: BreedDto) {
        return await this.save(breedDto);
    };

   
}