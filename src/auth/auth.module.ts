import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import {UserModule} from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [AuthService],
})
export class AuthModule {}
