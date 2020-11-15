import { EntityRepository, Repository } from 'typeorm';
import { getRepository } from "typeorm";

import { AnimalEntity } from '../animal.entity';
import { AnimalDto } from '../dto/animal.dto';


@EntityRepository(AnimalEntity)
export class AnimalRepository extends Repository<AnimalEntity> {
    /*

    async getAnimalByIdWithPhotos(idAnimal: number): Promise<AnimalDto> {
        return await getRepository(AnimalEntity)
            .createQueryBuilder("animal")
            .innerJoinAndSelect("animal.breed", "breed")
            .innerJoinAndSelect("breed.species", "species")
            .innerJoinAndSelect("animal.state", "state")
            .innerJoinAndSelect("animal.photos", "photo")
            .where("animal.id = :id", { id: idAnimal})
            .getOne();
    }
    */

    async createAnimal(animalDto: AnimalDto) {
        return await this.save(animalDto);
    };

    async findAvailable(): Promise<AnimalEntity[]> {
        const animals = await getRepository(AnimalEntity)
            .createQueryBuilder("animal")
            .innerJoinAndSelect("animal.breed", "breed")
            .innerJoinAndSelect("breed.species", "species")
            .innerJoinAndSelect("animal.state", "state")
            .where("animal.deathDate IS NULL")
            .andWhere("animal.state != :state", { state: "5" }).getMany();

        console.log(await getRepository(AnimalEntity)
            .createQueryBuilder("animal").innerJoinAndSelect("animal.breed", "breed").innerJoinAndSelect("breed.species", "species").where("animal.deathDate IS NULL")
            .andWhere("animal.state != :state", { state: "5" }).getSql());

        return animals;
    }


}