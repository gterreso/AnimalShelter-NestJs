import { SpeciesEntity } from '../species.entity';
import { EntityRepository, Repository } from 'typeorm';
import { SpeciesDto } from '../dto/species.dto';

@EntityRepository(SpeciesEntity)
export class SpeciesRepository extends Repository<SpeciesEntity> {

    async createSpecies(speciesDto: SpeciesDto) {
        return this.save(speciesDto);
    };

   
}