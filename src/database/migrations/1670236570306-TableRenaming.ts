import { MigrationInterface, QueryRunner } from "typeorm";

export class TableRenaming1670236570306 implements MigrationInterface {
    name = 'TableRenaming1670236570306'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "password" character varying NOT NULL, "avatar" character varying, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE TABLE "quotes" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_99a0e8bcbcd8719d3a41f23c263" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "votes" ("id" SERIAL NOT NULL, "vote" integer NOT NULL, "userId" integer, "quoteId" integer, CONSTRAINT "PK_f3d9fd4a0af865152c3f59db8ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "quotes" ADD CONSTRAINT "FK_8bad8bd49d1dd6954b46366349c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "FK_5169384e31d0989699a318f3ca4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "FK_fc15d08a435a5b2714eb79459cc" FOREIGN KEY ("quoteId") REFERENCES "quotes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_fc15d08a435a5b2714eb79459cc"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_5169384e31d0989699a318f3ca4"`);
        await queryRunner.query(`ALTER TABLE "quotes" DROP CONSTRAINT "FK_8bad8bd49d1dd6954b46366349c"`);
        await queryRunner.query(`DROP TABLE "votes"`);
        await queryRunner.query(`DROP TABLE "quotes"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
