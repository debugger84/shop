import {MigrationInterface, QueryRunner} from "typeorm";

export class ShopUser1571499058186 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user" ADD "salt" character varying(64) NOT NULL DEFAULT ''`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user" ALTER COLUMN "passwordHash" SET DEFAULT ''`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user"."user" ALTER COLUMN "passwordHash" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "user"."user" DROP COLUMN "salt"`, undefined);
    }

}
