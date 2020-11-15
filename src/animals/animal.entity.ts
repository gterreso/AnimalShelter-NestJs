import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { BreedEntity } from 'src/breed/breed.entity';
import { StateEntity } from 'src/state/state.entity';
//import { PhotoEntity } from '../photo/photo.entity';

@Entity()
export class AnimalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @ManyToOne(type => BreedEntity,breed => breed.id,{eager:true})
  breed: BreedEntity;

  @Column('int')
  weight: number;

  @Column('date')
  birthDate: Date;

  @Column('date')
  deathDate: Date;

  @Column({ length: 1 })
  vaccinated: string;

  @Column({ length: 1 })
  sterilized: string;

  @Column({ length: 1 })
  sex: string;

  @ManyToOne(type => StateEntity,state => state.id,{eager:true})
  state: StateEntity;
/*
  @OneToMany(type => PhotoEntity,photo => photo.animal,{eager:true})
  photos: PhotoEntity[];
  */

}