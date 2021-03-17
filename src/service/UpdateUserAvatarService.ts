import {getRepository } from "typeorm";
import User from "../models/User";

import path from 'path'
import fs from 'fs'


import uploadConfig from "../config/upload";
import AppError from "../errors/AppError";

interface Request {
    user_id: string,
    avatarFileName: string
}

export default class UpdateUserAvatarService {
    public async execute({user_id, avatarFileName}: Request): Promise<User> {
        const repository = getRepository(User);

        const user = await repository.findOne(user_id)

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

        await repository.save(user);

        return user;
        
      }
}