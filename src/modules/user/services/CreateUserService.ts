import User from '../infra/typeorm/entities/User'

import AppError from '@shared/errors/AppError';

import IUserRepository from '../repositories/IUserRepository';

import IHashProvider from '../providers/HashProvider/models/IHashProvider'

import { inject, injectable } from 'tsyringe';


interface Request {
  name: string, 
  email: string,
  password: string
}

@injectable()
export default class CreateUserService {

  constructor(@inject('UserRepository') private repository: IUserRepository, @inject('HashProvider') private hashProvider: IHashProvider ) {}

  public async execute({name, email, password}: Request): Promise<User> {
   
    const checkUserExists = await this.repository.findByEmail(email);

    if(checkUserExists) {
      throw new AppError('Email adress already used.')
    }

    const hashedPassword = await this.hashProvider.ganerateHash(password);

    const user = await this.repository.create({
      name,
      email,
      password: hashedPassword,
    });
 
    return user;
    
  }
}
