import { startOfHour } from 'date-fns';

import { inject, injectable } from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointment'

import AppError from '@shared/errors/AppError';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string, 
  date: Date
}

@injectable()
export default class CreateAppointmentService {

  constructor(@inject('AppointmentRepository') private repository: IAppointmentsRepository) {}

  public async execute({provider_id, date}: IRequest): Promise<Appointment> {

    const appointmentDate = startOfHour(date);
    
    const findAppointmentinsameDate = await this.repository.findByDate(appointmentDate);

    if(findAppointmentinsameDate) {
      throw new AppError('this appointment is already booked')
    }

    const appointment = await this.repository.create({
      provider_id,
      date: appointmentDate
    });

    return appointment;
  }
}
