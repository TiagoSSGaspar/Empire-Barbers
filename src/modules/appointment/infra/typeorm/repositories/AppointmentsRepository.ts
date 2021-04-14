import {getRepository, Repository} from 'typeorm';

import Appointment from '../entities/Appointment' 

import IAppointmentsRepository from '@modules/appointment/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointment/dtos/ICreateAppointmentDTO';


export default class AppointmentRepository implements IAppointmentsRepository  {

  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }
  public async create({provider_id, date}: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({provider_id, date});

    await this.ormRepository.save(appointment);

    return appointment;
  }
  
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: {date}
    })

      return findAppointment;
  }
}