import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment'
import AppointmentRepository from '../repositories/AppointmentsRepository';

import {getCustomRepository} from 'typeorm'
import AppError from '../errors/AppError';

interface Request {
  provider_id: string, 
  date: Date
}

export default class CreateAppointmentService {

  public async execute({provider_id, date}: Request): Promise<Appointment> {

    const repository = getCustomRepository(AppointmentRepository);

    const appointmentDate = startOfHour(date);
    
    const findAppointmentinsameDate = await repository.findByDate(appointmentDate);

    if(findAppointmentinsameDate) {
      throw new AppError('this appointment is already booked')
    }

    const appointment = repository.create({
      provider_id,
      date: appointmentDate
    });

    await repository.save(appointment);

    return appointment;
  }
}
