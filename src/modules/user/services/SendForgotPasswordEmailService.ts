import IUserRepository from '../repositories/IUserRepository';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserTokenRepository from '../repositories/IUserTokenRepository';


interface IRequest {
  email: string,
}

@injectable()
export default class SendForgotPasswordEmailService {

  constructor(
    @inject('UserRepository') private repository: IUserRepository, 
    @inject('MailProvider') private mailProvider: IMailProvider, 
    @inject('UserTokenRepository') private userTokenRepository: IUserTokenRepository, 
    
    ) {}

  public async execute({email}: IRequest): Promise<void> {
    const user = await this.repository.findByEmail(email);

    if(!user) {
      throw new AppError('User does not exists.');
    }

    const {token} = await this.userTokenRepository.generate(user.id);

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[Empire Barbers] recuperação de senha',
      templateData: {
        template: 'Olá {{name}}, {{token}}',
        variables: {
          name: user.name,
          token,
        }
      }
    })
  }
}
