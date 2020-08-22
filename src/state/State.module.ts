import { Module } from '@nestjs/common';
import { StateController } from './State.controller';
import { StateService } from './State.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StateRepository } from './repository/StateRepository';

@Module({
  imports: [TypeOrmModule.forFeature([StateRepository])],
  controllers: [StateController],
  providers: [StateService]
})
export class StateModule {}
