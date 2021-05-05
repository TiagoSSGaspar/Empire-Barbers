import FakeStrorageProvider from '@shared/container/providers/StroragerProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

import UpdateUserAvatarService from './UpdateUserAvatarService';


describe('UpdateUserAvatar', () => {
    it('should be able to create a new avatar', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeStrorageProvider = new FakeStrorageProvider();
        

        const updateUserAvatar = new UpdateUserAvatarService(fakeUserRepository, fakeStrorageProvider);

        const user = await fakeUserRepository.create({
                name: 'Tiago',
                email: 'tiagote@gmail.com',
                password: '1234567'
            });
        
        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar.svg'
        });

        expect(user.avatar).toBe('avatar.svg');
    });

    it('should not able to update avatar from non existing user', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeStrorageProvider = new FakeStrorageProvider();
        
        const updateUserAvatar = new UpdateUserAvatarService(fakeUserRepository, fakeStrorageProvider);

        expect(updateUserAvatar.execute({
            user_id: 'no-existir-user',
            avatarFileName: 'avatar.svg'
        })
        ).rejects.toBeInstanceOf(AppError);
    });


    it('should delete old avatar when updating new one', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeStrorageProvider = new FakeStrorageProvider();
        
        const deleteFile = jest.spyOn(fakeStrorageProvider, 'deleteFile');

        const updateUserAvatar = new UpdateUserAvatarService(fakeUserRepository, fakeStrorageProvider);

        const user = await fakeUserRepository.create({
                name: 'Tiago',
                email: 'tiagote@gmail.com',
                password: '1234567'
            });
        
        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar.svg'
        });
        
        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar2.svg'
        });
        
        expect(deleteFile).toHaveBeenCalledWith('avatar.svg');
        expect(user.avatar).toBe('avatar2.svg');
    });
    
});