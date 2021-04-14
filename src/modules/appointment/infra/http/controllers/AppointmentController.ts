import { Request, Response } from "express";

import { parseISO } from "date-fns";

import { container } from "tsyringe";

import CreateAppointmentService from "@modules/appointment/services/CreateAppointmentService";


export default class AppointmentController {
    public async create(request: Request, response: Response): Promise<Response>{
        const {provider_id, date } = request.body;

        const parseDate = parseISO(date);

        const createAppointment = container.resolve(CreateAppointmentService);

        const appointment = await createAppointment.execute({
            date: parseDate,
            provider_id: provider_id, 
            
        });

        return response.json(appointment);
    }
}