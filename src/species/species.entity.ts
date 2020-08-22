import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { AnimalEntity } from 'src/animals/animal.entity';
import { BreedEntity } from 'src/breed/breed.entity';

@Entity()
export class SpeciesEntity {

  @PrimaryGeneratedColumn()
  @OneToMany(type => BreedEntity,breed => breed.id)
  id: number;

  @Column({ length: 500 })
  name: string;

}