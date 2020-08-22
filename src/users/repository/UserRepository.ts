import { UserEntity } from '../user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { UserDto } from '../dto/user.dto';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  
    hola() {
        console.log("hola")
      }

    async createCat(userDto: UserDto) {
        console.log("Si es una funcion")
        return await this.save(userDto);
    };

   
}