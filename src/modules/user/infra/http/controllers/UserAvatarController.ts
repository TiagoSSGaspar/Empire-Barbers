import { Request, Response } from "express";

import UpdateUserAvatarService from "@modules/user/services/UpdateUserAvatarService";

import { container } from "tsyringe";


export default class UserAvatarController {
    public async update(request: Request, response: Response): Promise<Response> {
        const updateUserAvatar = container.resolve(UpdateUserAvatarService);

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFileName: request.file.filename
            });

        //@ts-ignore 
        delete user.password;

        return response.json(user);
    }
        
}