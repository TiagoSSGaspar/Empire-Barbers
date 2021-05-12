import User from "../infra/typeorm/entities/User"

import AppError from '@shared/errors/AppError';

import IUserRepository from "../repositories/IUserRepository";

import IStrorageProvider from "@shared/container/providers/StoragerProvider/models/IStorageProvider";

import { inject, injectable } from "tsyringe";


interface IRequest {
    user_id: string,
    avatarFileName: string
}


@injectable()
export default class UpdateUserAvatarService {

    constructor(@inject('UserRepository') private repository: IUserRepository, @inject('StrorageProvider') private storageProvider: IStrorageProvider) {}

    public async execute({user_id, avatarFileName}: IRequest): Promise<User> {
       
        const user = await this.repository.findById(user_id)

        if(!user) {
            throw new AppError('Only autheticated users can change avatar', 401);
        }

        if(user.avatar) {
           await this.storageProvider.deleteFile(user.avatar);
        }

        const fileName = await this.storageProvider.saveFile(avatarFileName);

        user.avatar = fileName;

        await this.repository.save(user);

        return user;
        
      }
}