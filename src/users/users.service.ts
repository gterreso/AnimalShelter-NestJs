
import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/UserRepository';

export type User = any;

@Injectable()
export class UsersService {

  constructor(private userRepository:UserRepository) {
  }

  async findOne(reqEmail: string,reqPassword: string): Promise<User | undefined> {
    return this.userRepository.findOne({ email: reqEmail, password: reqPassword })
  }
  
}