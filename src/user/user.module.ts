import { Module } from '@nestjs/common';
import {RegistrationController} from './controller/registration.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UserService} from './service/user.service';
import {UserRepository} from './repository/user.repository';
import {UserRegisterer} from './service/command/user.registerer';
import {UserFinder} from './service/exported/user.finder';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository])],
    providers: [
        UserService,
        UserRegisterer,
        UserFinder,
    ],
    exports: [UserFinder],
    controllers: [RegistrationController],
})
export class UserModule {}
