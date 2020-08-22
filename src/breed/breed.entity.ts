import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { SpeciesEntity } from 'src/species/species.entity';
import { AnimalEntity } from 'src/animals/animal.entity';

@Entity()
export class BreedEntity {

  @PrimaryGeneratedColumn()
  @OneToMany(type => AnimalEntity, animal => animal.breed)
  id: number;

  @ManyToOne(type => SpeciesEntity, species => species.id,{eager:true})
  species:SpeciesEntity;

  @Column({ length: 500 })
  name: string;

}