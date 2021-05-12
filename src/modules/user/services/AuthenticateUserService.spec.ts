//import 'reflect-metadata';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

describe('AutheticateUser', () => {
    it('should be able to authenticate', async () => {
        const fakeUserRepository = new FakeUserRepository();
        
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
        
        const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);
        
        const user = await createUser.execute({
            name: 'Tiago',
            email: 'tiagote@gmail.com',
            password: '1234567'
        })

        const response = await authenticateUser.execute({
                email: 'tiagote@gmail.com',
                password: '1234567'
            });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });
    
    it('should not be able to authenticate whin non exixting user', async () => {
        const fakeUserRepository = new FakeUserRepository();
        
        const fakeHashProvider = new FakeHashProvider();
        
        const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);
        
        await expect(authenticateUser.execute({
                email: 'tiagote@gmail.com',
                password: '1234567'
            })
        ).rejects.toBeInstanceOf(AppError);
       
    });

    it('should not be able to authenticate whin wrong password', async () => {
        const fakeUserRepository = new FakeUserRepository();
        
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
        
        const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);
        
        await createUser.execute({
            name: 'Tiago',
            email: 'tiagote@gmail.com',
            password: '1234567'
        })


        await expect(authenticateUser.execute({
                email: 'tiagote@gmail.com',
                password: '12345'
            })
        ).rejects.toBeInstanceOf(AppError);
    });
    
});