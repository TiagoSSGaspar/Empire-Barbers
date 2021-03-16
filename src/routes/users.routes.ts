import {Router} from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CreateUserService from '../service/CreateUserService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    try { 
      
        const {name, email, password} = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
          name,
          email,
          password
        });

        //@ts-expect-error
        delete user.password;

        return response.json(user)

    } catch (e) {
      return response.status(400).json({error: e.message})
    }

});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
  return response.json({msg:'ok'});
});

export default usersRouter;