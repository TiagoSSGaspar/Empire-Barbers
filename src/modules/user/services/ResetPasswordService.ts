import { inject, injectable } from 'tsyringe';

import IUserRepository from '../repositories/IUserRepository';

import IUserTokenRepository from '../repositories/IUserTokenRepository';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppError';

import { addHours,isAfter } from 'date-fns';


interface IRequest {
  token: string,
  password: string,
}

@injectable()
export default class ResetPasswordService {

  constructor(
    @inject('UserRepository') private repository: IUserRepository, 
    @inject('UserTokenRepository') private userTokenRepository: IUserTokenRepository, 
    @inject('HashProvider') private hashProvider: IHashProvider, 
    
    ) {}

  public async execute({token, password}: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    console.log(userToken)

    if(!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await this.repository.findById(userToken.user_id);

    if(!user) {
      throw new AppError('User does not exists');
    }

    const tokenCreateAt = userToken.created_at;
    const compareDate = addHours(tokenCreateAt, 2);
     
    if(isAfter(Date.now(), compareDate)) {
      throw new AppError('Token exprired');
    }

    user.password = await this.hashProvider.ganerateHash(password);

    await this.repository.save(user);

  }
}
