import { EntityRepository, Repository } from 'typeorm'
import { StateEntity } from '../state.entity'
import { StateDto } from '../dto/State.dto'


@EntityRepository(StateEntity)
export class StateRepository extends Repository<StateEntity> {

    async createState(stateDto: StateDto) {
        return await this.save(stateDto);
    };

   
}