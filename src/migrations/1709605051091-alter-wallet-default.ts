import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterWalletDefault1709605051091 implements MigrationInterface {
    name = 'AlterWalletDefault1709605051091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" ALTER COLUMN "balance" SET DEFAULT '5000'`);
        await queryRunner.query(`ALTER TABLE "wallet" ALTER COLUMN "money_type" SET DEFAULT 'usd'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" ALTER COLUMN "money_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "wallet" ALTER COLUMN "balance" DROP DEFAULT`);
    }

}
