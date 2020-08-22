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
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
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
