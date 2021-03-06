import {sign} from 'jsonwebtoken';

import authConfig from '@config/auth'

import User from '../infra/typeorm/entities/User'

import AppError from '@shared/errors/AppError';

import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import { inject, injectable } from 'tsyringe';


interface IRequest {
  email: string,
  password: string
}

interface IResponse {
  user: User,
  token: string
}

@injectable()
export default class AuthenticateUserService {

  constructor(@inject('UserRepository') private repository: IUserRepository, @inject('HashProvider') private hashProvider: IHashProvider) {}

  public async execute({email, password}: IRequest): Promise<IResponse> {

    const user = await this.repository.findByEmail(email);

    if(!user) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const passwordMatched = await this.hashProvider.compareHash(password, user.password);

    if(!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const {secret, expiresIn} = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    });

    return {
      user,
      token
    }

  }
}
