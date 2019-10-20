import {User} from '../entity/user';
import {Injectable} from '@nestjs/common';
import {UserRepository} from '../repository/user.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }
}
