import {Router} from 'express';

import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';

import AppointmentController from '../controllers/AppointmentController';

const appointmentsRouter = Router();

const appointmentController = new AppointmentController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentController.create);

export default appointmentsRouter;



/*
appointmentsRouter.get('/', async (request, response) => {
  
  const appointments = await appointmentRepository.find();
  
  return response.json(appointments);
});
*/