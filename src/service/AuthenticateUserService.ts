import {compare} from 'bcryptjs'

import User from '../models/User'

import {getRepository} from 'typeorm'

interface Request {
  email: string,
  password: string
}

interface Response {
  user: User
}

export default class AuthenticateUserService {

  public async execute({email, password}: Request): Promise<Response> {

    const repository = getRepository(User);
    
    const user = await repository.findOne({
      where: {email}
    });

    if(!user) {
      throw new Error('Incorrect email/password combination')
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched) {
      throw new Error('Incorrect email/password combination')
    }

    return {
      user
    }

  }
}
