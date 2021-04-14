import {container} from 'tsyringe';

import AppointmentRepository from '@modules/appointment/infra/typeorm/repositories/AppointmentsRepository';
import IAppointmentsRepository from '@modules/appointment/repositories/IAppointmentsRepository';

import IUserRepository from '@modules/user/repositories/IUserRepository';
import UserRepository from '@modules/user/infra/typeorm/repositories/UserRepository';

container.registerSingleton<IAppointmentsRepository>('AppointmentRepository', AppointmentRepository);
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);