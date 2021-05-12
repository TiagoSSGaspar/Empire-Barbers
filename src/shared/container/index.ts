import {container} from 'tsyringe';

import '@modules/user/providers';
import './providers';

import AppointmentRepository from '@modules/appointment/infra/typeorm/repositories/AppointmentsRepository';
import IAppointmentsRepository from '@modules/appointment/repositories/IAppointmentsRepository';

import IUserRepository from '@modules/user/repositories/IUserRepository';
import UserRepository from '@modules/user/infra/typeorm/repositories/UserRepository';

import IUserTokenRepository from '@modules/user/repositories/IUserTokenRepository';
import UserTokenRepository from '@modules/user/infra/typeorm/repositories/UserTokenRepository';

container.registerSingleton<IAppointmentsRepository>('AppointmentRepository', AppointmentRepository);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IUserTokenRepository>('UserTokenRepository', UserTokenRepository);

