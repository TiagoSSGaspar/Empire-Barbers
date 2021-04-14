import User from "../infra/typeorm/entities/User"

import path from 'path'
import fs from 'fs'

import uploadConfig from '@config/upload'

import AppError from '@shared/errors/AppError';

import IUserRepository from "../repositories/IUserRepository";

import { inject, injectable } from "tsyringe";

interface IRequest {
    user_id: string,
    avatarFileName: string
}


@injectable()
export default class UpdateUserAvatarService {

    constructor(@inject('UserRepository') private repository: IUserRepository) {}

    public async execute({user_id, avatarFileName}: IRequest): Promise<User> {
       
        const user = await this.repository.findById(user_id)

        if(!user) {
            throw new AppError('Only autheticated users can change avatar', 401);
        }

        if(user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if(userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFileName;

        await this.repository.save(user);

        return user;
        
      }
}