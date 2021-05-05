//import 'reflect-metadata';

import AppError from "@shared/errors/AppError";
import FakeAppointmentRepository from "../repositories/fakes/FakeAppointmentsRepository";
import CreateAppointmentService from "./CreateAppointmentService";

describe('CreateAppointmentService', () => {
    it('should be able to create a new appointment', async () => {
        const fakeAppointmentRepository = new FakeAppointmentRepository();
        const createAppointmentService = new CreateAppointmentService(fakeAppointmentRepository);

        const appointment= await createAppointmentService.execute({
                date: new Date(),
                provider_id: '123'
            });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123');

    });


    it('should not be able to create two new appointment on the same time', async () => {
        const fakeAppointmentRepository = new FakeAppointmentRepository();
        const createAppointmentService = new CreateAppointmentService(fakeAppointmentRepository);

        const appointmentDate = new Date();

        await createAppointmentService.execute({
                date: appointmentDate,
                provider_id: '123'
            });

        expect(createAppointmentService.execute({
            date: appointmentDate,
            provider_id: '123'
        })).rejects.toBeInstanceOf(AppError);
    });


});