import {EntityRepository, Repository} from 'typeorm';
import {User} from '../entity/user';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    findOneByEmail(email: string): Promise<User | undefined> {
        const qb = this.createQueryBuilder('user');
        qb.where('user.email = :userEmail', { userEmail: email });

        return qb.getOne();
    }
}
