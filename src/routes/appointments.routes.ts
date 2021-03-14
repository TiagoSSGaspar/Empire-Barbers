import {Router} from 'express';
import {parseISO} from 'date-fns';

import {getCustomRepository} from 'typeorm'

import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../service/CreateAppointmentService'

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {

  console.log(request.user)
  const repository = getCustomRepository(AppointmentRepository);
  const appointments = await repository.find();

  return response.json(appointments);
})

appointmentsRouter.post('/', async (request, response) => {
    try { 
      const {provider_id, date } = request.body;

      const parseDate = parseISO(date);
    
      const createAppointment = new CreateAppointmentService();

      const appointment = await createAppointment.execute({
        date: parseDate,
        provider_id: provider_id, 
        
      })

      return response.json(appointment);

    } catch (e) {
      return response.status(400).json({error: e.message})
    }

});

export default appointmentsRouter;