import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

//import { PhotoRepository } from './repository/PhotoRepository';

@Module({
  imports: [/*TypeOrmModule.forFeature([PhotoRepository])*/],
  controllers: [],
  providers: []
})
export class PhotoModule {}
