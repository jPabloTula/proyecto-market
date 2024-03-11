import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterAtributosEntitties1709922004729 implements MigrationInterface {
    name = 'AlterAtributosEntitties1709922004729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shopping-session" DROP CONSTRAINT "FK_96648d91dd2e6e4e36230d1bccb"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "FK_72679d98b31c737937b8932ebe6"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "FK_e05524674399f57b2aebbf83587"`);
        await queryRunner.query(`ALTER TABLE "order-items" DROP CONSTRAINT "FK_4640b5bdb54311d9d1a4db9c0aa"`);
        await queryRunner.query(`ALTER TABLE "order-items" DROP CONSTRAINT "FK_d42918a88740ece11347e20918f"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_2fdbbae70ff802bc8b703ee7c5c"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "userId" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP COLUMN "sessionId"`);
        await queryRunner.query(`ALTER TABLE "order-items" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "order-items" DROP COLUMN "orderId"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "orderId"`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD "product_id" uuid`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD "session_id" uuid`);
        await queryRunner.query(`ALTER TABLE "order-items" ADD "product_id" uuid`);
        await queryRunner.query(`ALTER TABLE "order-items" ADD "order_id" uuid`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "order_id" uuid`);
        await queryRunner.query(`ALTER TABLE "shopping-session" ADD CONSTRAINT "FK_6b0b7c179f73ffb25f534fb1d5f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "FK_30e89257a105eab7648a35c7fce" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "FK_12c41333aa51cc59187becdae93" FOREIGN KEY ("session_id") REFERENCES "shopping-session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order-items" ADD CONSTRAINT "FK_96c3a0b7ccbd510353f1a3dd500" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order-items" ADD CONSTRAINT "FK_02d2d9fb9489ee7213bcce96770" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_e9acc6efa76de013e8c1553ed2b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_3cb0558ed36997f1d9ecc1118e7" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_3cb0558ed36997f1d9ecc1118e7"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_e9acc6efa76de013e8c1553ed2b"`);
        await queryRunner.query(`ALTER TABLE "order-items" DROP CONSTRAINT "FK_02d2d9fb9489ee7213bcce96770"`);
        await queryRunner.query(`ALTER TABLE "order-items" DROP CONSTRAINT "FK_96c3a0b7ccbd510353f1a3dd500"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "FK_12c41333aa51cc59187becdae93"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "FK_30e89257a105eab7648a35c7fce"`);
        await queryRunner.query(`ALTER TABLE "shopping-session" DROP CONSTRAINT "FK_6b0b7c179f73ffb25f534fb1d5f"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "order_id"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "order-items" DROP COLUMN "order_id"`);
        await queryRunner.query(`ALTER TABLE "order-items" DROP COLUMN "product_id"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP COLUMN "session_id"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP COLUMN "product_id"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "orderId" uuid`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "order-items" ADD "orderId" uuid`);
        await queryRunner.query(`ALTER TABLE "order-items" ADD "productId" uuid`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD "sessionId" uuid`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD "productId" uuid`);
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "user_id" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_2fdbbae70ff802bc8b703ee7c5c" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order-items" ADD CONSTRAINT "FK_d42918a88740ece11347e20918f" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order-items" ADD CONSTRAINT "FK_4640b5bdb54311d9d1a4db9c0aa" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "FK_e05524674399f57b2aebbf83587" FOREIGN KEY ("sessionId") REFERENCES "shopping-session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "FK_72679d98b31c737937b8932ebe6" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shopping-session" ADD CONSTRAINT "FK_96648d91dd2e6e4e36230d1bccb" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
