import { IsEmail, IsNotEmpty } from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class RegisterUserDto {
    @IsEmail({}, {
        message: 'Wrong email format',
    })
    @IsNotEmpty({
        message: 'Email is required',
    })
    @ApiModelProperty()
    email: string;

    @IsNotEmpty({
        message: 'Name is required',
    })
    @ApiModelProperty()
    name: string;

    @IsNotEmpty({
        message: 'Password is required',
    })
    @ApiModelProperty()
    password: string;
}
