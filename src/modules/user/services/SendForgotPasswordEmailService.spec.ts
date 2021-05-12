//import 'reflect-metadata'; // é possível que os teste falhe sem esse import, caso falhe descomente essa linha

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';


let fakeUserRepository: FakeUserRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;



describe('SendForgotpasswordEmail', () => {

    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository()
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokenRepository = new FakeUserTokenRepository();
    
        sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
            fakeUserRepository,
            fakeMailProvider, 
            fakeUserTokenRepository 
            );   
            
    });

    it('should be able to recover the passoword using the email', async () => {    
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
        
        await fakeUserRepository.create({
            name: 'Tiago',
            email: 'tiagote@gmail.com',
            password: '1234567'
        })

        await sendForgotPasswordEmailService.execute({
                email: 'tiagote@gmail.com',
            });

        expect(sendMail).toHaveBeenCalled();
    });

    it('should not able to recover anon-exixting user passoword ', async () => {
        await expect(sendForgotPasswordEmailService.execute({
            email: 'tiagote@gmail.com',
        })
        ).rejects.toBeInstanceOf(AppError);
    });
    
    it('should not be able forgot passoword token', async () => {
        const generate = jest.spyOn(fakeUserTokenRepository, 'generate');
       
        const user = await fakeUserRepository.create({
            name: 'Tiago',
            email: 'tiagote@gmail.com',
            password: '1234567'
        })

        await sendForgotPasswordEmailService.execute({
                email: 'tiagote@gmail.com',
            });

        expect(generate).toHaveBeenCalledWith(user.id);
    });


});