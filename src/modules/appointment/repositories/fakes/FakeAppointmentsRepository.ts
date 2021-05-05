
import {v4} from 'uuid';

import IAppointmentsRepository from '@modules/appointment/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointment/dtos/ICreateAppointmentDTO';

import Appointment from '@modules/appointment/infra/typeorm/entities/Appointment';
import { isEqual } from 'date-fns';


export default class FakeAppointmentRepository implements IAppointmentsRepository  {

    private appointment: Appointment[] = [];

    public async create({provider_id, date}: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();
       
        Object.assign(appointment, {id: v4(), date, provider_id});

        this.appointment.push(appointment);

        return appointment;
    }
    
    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = this.appointment.find(appointment => isEqual(appointment.date, date));

        return findAppointment;
    }
}