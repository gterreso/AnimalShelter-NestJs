/*
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { AnimalEntity } from '../animals/animal.entity';

@Entity()
export class PhotoEntity {
  @PrimaryGeneratedColumn()
  
  id: number;

  @Column({ length: 500 })
  resource: string;

  @Column({ length: 1 })
  mainPhoto: string;

  @ManyToOne(type => AnimalEntity,animal => animal.photos)
  animal: AnimalEntity;


}
*/