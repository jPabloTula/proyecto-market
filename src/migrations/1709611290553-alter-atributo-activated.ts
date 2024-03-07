import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterAtributoActivated1709611290553 implements MigrationInterface {
    name = 'AlterAtributoActivated1709611290553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "activated"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "activated" integer NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "activated"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "activated" boolean NOT NULL`);
    }

}
