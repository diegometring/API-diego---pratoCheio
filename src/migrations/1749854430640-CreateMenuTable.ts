import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMenuTable1749854430640 implements MigrationInterface {
 public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE menu_category AS ENUM (
                'APPETIZER', 
                'MAIN_COURSE', 
                'DESSERT', 
                'BEVERAGE', 
                'SIDE_DISH'
            );
            
            CREATE TABLE menu (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                category menu_category NOT NULL,
                available BOOLEAN DEFAULT TRUE NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            
            CREATE TRIGGER update_menu_updated_at
            BEFORE UPDATE ON menu
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at();
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TRIGGER IF EXISTS update_menu_updated_at ON menu;
            DROP TABLE IF EXISTS menu;
            DROP TYPE IF EXISTS menu_category;
        `);
    }
}
