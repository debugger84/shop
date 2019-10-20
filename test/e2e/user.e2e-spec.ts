import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {AppModule} from '../../src/app.module';
import {ClassSerializerInterceptor, ValidationPipe} from '@nestjs/common';
import {Connection, EntityManager} from 'typeorm';
import {Reflector} from '@nestjs/core';

describe('UserController (e2e)', () => {
    let app;
    let queryRunner;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        const reflector = app.get(Reflector);
        app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
        await app.init();
        const dbConnection = moduleFixture.get(Connection);
        const manager = moduleFixture.get(EntityManager);
        // @ts-ignore
        queryRunner = manager.queryRunner = dbConnection.createQueryRunner('master');
    });

    afterAll(async () => {
        await app.close();
    });

    beforeEach(async () => {
        await queryRunner.startTransaction();
    });

    afterEach(async () => {
        await queryRunner.rollbackTransaction();
    });

    it('/user/registration/on-board (GET)', () => {
        return request(app.getHttpServer())
            .get('/user/registration/on-board')
            .expect(200)
            .then(response => {
                expect(response.body[0].id).toBe(1);
            })
            ;
    });

    it('/user/registration (POST)', () => {
        return request(app.getHttpServer())
            .post('/user/registration')
            .send({name: 'john', email: 'john@test.com', password: '12345'})
            .set('Accept', 'application/json')
            .expect(201)
            .then(response => {
                expect(response.body.email).toBe('john@test.com');
                expect(response.body.passwordHash).not.toBeDefined();
            })
            ;
    });

    it('/user/registration (POST) empty data', () => {
        return request(app.getHttpServer())
            .post('/user/registration')
            .send({})
            .set('Accept', 'application/json')
            .expect(400)
            .then(response => {
                expect(response.body.error).toBe('Bad Request');
            })
            ;
    });

    it('/user/registration (POST) exists user', () => {
        return request(app.getHttpServer())
            .post('/user/registration')
            .send({name: 'john', email: 'test@test.com', password: '12345'})
            .set('Accept', 'application/json')
            .expect(422)
            .then(response => {
                expect(response.body).toStrictEqual({
                    statusCode: 422,
                    error: 'Unprocessable Entity',
                    message: 'User with such email already exists',
                });
            })
            ;
    });

    it('/user/registration (POST) wrong data', () => {
        return request(app.getHttpServer())
            .post('/user/registration')
            .send({name: 'john', email: 'test.com', password: '12345'})
            .set('Accept', 'application/json')
            .expect(400)
            .then(response => {
                const str = JSON.stringify(response.body);
                expect(response.body.statusCode).toBe(400);
                expect(response.body.error).toBe('Bad Request');
            })
            ;
    });
});
