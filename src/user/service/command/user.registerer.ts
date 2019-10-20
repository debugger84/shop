import {Injectable, UnprocessableEntityException} from '@nestjs/common';
import {UserRepository} from '../../repository/user.repository';
import {User} from '../../entity/user';
import {RegisterUserDto} from '../../request/register.user.dto';

@Injectable()
export class UserRegisterer {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    async registerUserByEmail(userInfo: RegisterUserDto): Promise<User> {
        let user = await this.userRepository.findOneByEmail(userInfo.email);
        if (user !== undefined) {
            throw new UnprocessableEntityException('User with such email already exists');
        }
        user = new User(userInfo.name, userInfo.email);
        await user.changePassword(userInfo.password);
        user = await this.userRepository.save(user);

        return user;
    }
}
