
import User from '../../infra/typeorm/entities/User';

import { v4  as uuid } from 'uuid';
import IUserTokenRepository from '../IUserTokenRepository';
import UserToken from '@modules/user/infra/typeorm/entities/UserToken';


export default class FakeUserTokenRepository implements IUserTokenRepository  {
    private usersTokens: UserToken[] = [];
    
    public async generate(user_id: string): Promise<UserToken> {
        const userToken = new UserToken();
        
        Object.assign(userToken, {
            id: uuid(),
            token: uuid(),
            user_id,
            created_at: new Date(),
            updated_at: new Date()
        });
        
        this.usersTokens.push(userToken);
        
        return userToken;
    }
    
    public async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = this.usersTokens.find(findToken => findToken.token === token);

        return userToken;
    }
    
}