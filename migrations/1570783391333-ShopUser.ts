import {MigrationInterface, QueryRunner} from 'typeorm';

export class ShopUser1570783391333 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE schema "user";`);
        await queryRunner.query(`
            CREATE TABLE "user"."user" (
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "email" character varying(180) NOT NULL,
                "passwordHash" character varying(64) NOT NULL,
                CONSTRAINT "UQ_65d72a4b8a5fcdad6edee8563b0" UNIQUE ("email"),
                CONSTRAINT "PK_758b8ce7c18b9d347461b30228d"
                PRIMARY KEY ("id")
            )`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "user"."user"`, undefined);
        await queryRunner.query(`DROP schema "user";`);
    }

}
