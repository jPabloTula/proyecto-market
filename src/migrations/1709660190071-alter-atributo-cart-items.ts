import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterAtributoCartItems1709660190071 implements MigrationInterface {
    name = 'AlterAtributoCartItems1709660190071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_items" RENAME COLUMN "session_id" TO "sessionId"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP COLUMN "sessionId"`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD "sessionId" uuid`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "FK_e05524674399f57b2aebbf83587" FOREIGN KEY ("sessionId") REFERENCES "shopping-session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "FK_e05524674399f57b2aebbf83587"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP COLUMN "sessionId"`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD "sessionId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cart_items" RENAME COLUMN "sessionId" TO "session_id"`);
    }

}
