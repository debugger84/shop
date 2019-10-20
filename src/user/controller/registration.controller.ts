import {Body, ClassSerializerInterceptor, Controller, Get, Post, UseInterceptors} from '@nestjs/common';
import {UserService} from '../service/user.service';
import {RegisterUserDto} from '../request/register.user.dto';
import {UserRegisterer} from '../service/command/user.registerer';
import {ApiBadRequestResponse, ApiCreatedResponse, ApiImplicitBody, ApiModelProperty, ApiUseTags} from '@nestjs/swagger';
import {User} from '../entity/user';

@ApiUseTags('user')
@Controller('user/registration')
export class RegistrationController {
    constructor(
        private readonly userService: UserService,
        private readonly registerer: UserRegisterer,
    ) {}

    @Post('/')
    // @ApiImplicitBody({name: 'Register a user'})
    @ApiBadRequestResponse({description: 'Wrong data'})
    @ApiCreatedResponse({ description: 'The user was created.', type: User })
    async register(@Body() request: RegisterUserDto): Promise<User> {
        return this.registerer.registerUserByEmail(request);
    }

    @Get('/on-board')
    onBoardDevice() {
        return this.userService.findAll();
    }
}
