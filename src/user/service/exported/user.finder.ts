import {UserRepository} from '../../repository/user.repository';
import {User} from '../../entity/user';
import {Injectable} from '@nestjs/common';

@Injectable()
export class UserFinder {
    constructor(private readonly userRepository: UserRepository) {}

    public async findUserByEmail(email: string): Promise<User> {
        return this.userRepository.findOneByEmail(email);
    }
}
