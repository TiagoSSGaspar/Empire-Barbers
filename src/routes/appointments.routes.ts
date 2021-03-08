import {Router} from 'express';
import {parseISO} from 'date-fns';

import {getCustomRepository} from 'typeorm'

import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../service/CreateAppointmentService'

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
  const repository = getCustomRepository(AppointmentRepository);
  const appointments = await repository.find();

  return response.json(appointments);
})

appointmentsRouter.post('/', async (request, response) => {
    try { 
      const {provider, date } = request.body;

      const parseDate = parseISO(date);
    
      const createAppointment = new CreateAppointmentService();

      const appointment = await createAppointment.execute({
        provider: provider,
        date: parseDate
      })

      return response.json(appointment);

    } catch (e) {
      return response.status(400).json({error: e.message})
    }

});

export default appointmentsRouter;