import { Injectable } from '@nestjs/common';
import {UserRepository} from '../../user/repository/user.repository';
import {UserFinder} from '../../user/service/exported/user.finder';

@Injectable()
export class AuthService {
    constructor(
        private readonly userFinder: UserFinder,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userFinder.findUserByEmail(email);
        if (user && await user.isPasswordCorrect(password)) {
            return user;
        }
        return null;
    }
}
