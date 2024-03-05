import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterWallet1709604687163 implements MigrationInterface {
    name = 'AlterWallet1709604687163'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" DROP COLUMN "money_type"`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD "money_type" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" DROP COLUMN "money_type"`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD "money_type" integer NOT NULL`);
    }

}
