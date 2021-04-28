import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MulterModule } from '@nestjs/platform-express';;
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


import { AnimalsModule } from './animals/animals.module';
import { SpeciesModule } from './species/species.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BreedModule } from './breed/breed.module';
import { StateModule } from './state/state.module';
import { PhotoModule } from './photo/photo.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ec2-52-209-134-160.eu-west-1.compute.amazonaws.com',
      port: 5432,
      username: 'obgtzrjccovivb',
      password: '5f0e3aadf7b34de2d1dfce9c2c2cb669b0c66ef3a75dc1ed4aca7a7ae6d48327',
      database: 'd5hhnogcedn0th',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl:true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        }
   }
    }),
    AnimalsModule,
    SpeciesModule,
    BreedModule,
    StateModule,
    AuthModule,
    UsersModule,
    PhotoModule,
  ],
})

//It seems that ignores this register and just uses the method signature options
@Module({
  imports: [MulterModule.register({
    dest: './resources/tmp',
    limits: { fieldSize: 25 * 1024 * 1024 * 1024, fileSize: 25 * 1024 * 1024 * 1024 }
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
