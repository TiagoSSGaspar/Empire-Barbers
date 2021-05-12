//import 'reflect-metadata'; // é possível que os teste falhe sem esse import, caso falhe descomente essa linha

import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let resetPassword: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;


describe('ResetPasswordService', () => {

    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository()
        fakeUserTokenRepository = new FakeUserTokenRepository();
        fakeHashProvider = new FakeHashProvider();
    
        resetPassword = new ResetPasswordService(
            fakeUserRepository,
            fakeUserTokenRepository,
            fakeHashProvider 
        );   
            
    });

    it('should be able to reset the passoword ', async () => {    

        const user = await fakeUserRepository.create({
            name: 'Tiago',
            email: 'tiagote@gmail.com',
            password: '1234567'
        });

        const {token} = await fakeUserTokenRepository.generate(user.id);

        const ganerateHash =  jest.spyOn(fakeHashProvider, 'ganerateHash');

        
        await resetPassword.execute({
            password: '12345678',
            token,
        });
        
        const updateUser = await fakeUserRepository.findById(user.id)
        
        expect(ganerateHash).toHaveBeenCalledWith('12345678');
        expect(updateUser?.password).toBe('12345678');
    });

    it('should not be able to reset the passoword with non-existing token ', async () => {    

        await expect(
            resetPassword.execute({
                password: '12345678',
                token:'non-existing token',
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset the passoword with non-existing user ', async () => {    

        const {token} = await fakeUserTokenRepository.generate('non-exixting user');

        await expect(
            resetPassword.execute({
                password: '12345678',
                token
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset the passoword if passed more than 2 hours ', async () => {    

        const user = await fakeUserRepository.create({
            name: 'Tiago',
            email: 'tiagote@gmail.com',
            password: '1234567',
        });

        const {token} = await fakeUserTokenRepository.generate(user.id)

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const custonDate = new Date();

            return custonDate.setHours(custonDate.getHours() + 3);
        });

        await expect(
            resetPassword.execute({
                password: '12345678',
                token,
            })
        ).rejects.toBeInstanceOf(AppError);

    });

});