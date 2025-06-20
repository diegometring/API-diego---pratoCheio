import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateStockTable1749854467563 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE stock (
                id SERIAL PRIMARY KEY,
                nameProduct VARCHAR(255) NOT NULL,
                quantity INTEGER NOT NULL,
                unitPrice DECIMAL(10,2) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            
            CREATE TRIGGER update_stock_updated_at
            BEFORE UPDATE ON stock
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at();
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TRIGGER IF EXISTS update_stock_updated_at ON stock;
            DROP TABLE IF EXISTS stock;
        `);
    }
}