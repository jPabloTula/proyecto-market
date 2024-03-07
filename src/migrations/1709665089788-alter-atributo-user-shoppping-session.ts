import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterAtributoUserShopppingSession1709665089788 implements MigrationInterface {
    name = 'AlterAtributoUserShopppingSession1709665089788'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shopping-session" DROP CONSTRAINT "FK_96648d91dd2e6e4e36230d1bccb"`);
        await queryRunner.query(`ALTER TABLE "shopping-session" ADD CONSTRAINT "UQ_96648d91dd2e6e4e36230d1bccb" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "shopping-session" ADD CONSTRAINT "FK_96648d91dd2e6e4e36230d1bccb" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shopping-session" DROP CONSTRAINT "FK_96648d91dd2e6e4e36230d1bccb"`);
        await queryRunner.query(`ALTER TABLE "shopping-session" DROP CONSTRAINT "UQ_96648d91dd2e6e4e36230d1bccb"`);
        await queryRunner.query(`ALTER TABLE "shopping-session" ADD CONSTRAINT "FK_96648d91dd2e6e4e36230d1bccb" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
