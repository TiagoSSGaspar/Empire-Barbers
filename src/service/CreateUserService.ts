import User from '../models/User'

import {getRepository} from 'typeorm'

interface Request {
  name: string, 
  email: string,
  password: string
}

export default class CreateUserService {

  public async execute({name, email, password}: Request): Promise<User> {
    const repository = getRepository(User);

    const userExists = await repository.findOne({
      where: {email}
    });

    if(userExists) {
      throw new Error('Email adress already used.')
    }

    const user = repository.create({
      name,
      email,
      password,
    });

    await repository.save(user);
   
    return user;
    
  }
}
