import { Test, TestingModule } from '@nestjs/testing';
import {UserRegisterer} from '../../../../src/user/service/command/user.registerer';
import {RegisterUserDto} from '../../../../src/user/request/register.user.dto';
import {Connection, EntityManager} from 'typeorm';
import {UserRepository} from '../../../../src/user/repository/user.repository';
import {canReportError} from 'rxjs/internal/util/canReportError';
import {of} from 'rxjs';
import {User} from '../../../../src/user/entity/user';

describe('User Registerer', () => {
  let registerer: UserRegisterer;
  let userRepo: UserRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [UserRegisterer, UserRepository],
    }).compile();

    registerer = app.get<UserRegisterer>(UserRegisterer);
    userRepo = app.get<UserRepository>(UserRepository);
  });

  afterEach(async () => {
    jest.resetAllMocks();
  });

  describe('Test adding user', () => {
    it('should return "Hi!"', async () => {
      const userInfo = new RegisterUserDto();
      userInfo.name = 'Test11';
      userInfo.email = 'test11@test.com';
      userInfo.password = 'test';

      jest.spyOn(userRepo, 'findOneByEmail').mockImplementationOnce(() => undefined);
      jest.spyOn(userRepo, 'save').mockImplementationOnce((userEntity) => userEntity);

      const user = await registerer.registerUserByEmail(userInfo);
      expect(user.name).toBe(userInfo.name);
      expect(user.email).toBe(userInfo.email);
      expect(user.passwordHash).toBe('test');
    });
  });
});
