import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AnimalEntity } from '../animals/animal.entity';

@Entity()
export class StateEntity {

  @PrimaryGeneratedColumn()
  @OneToMany(type => AnimalEntity, animal => animal.state)
  id: number;

  @Column({ length: 500 })
  name: string;

}