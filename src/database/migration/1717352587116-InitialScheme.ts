import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialScheme1717352587116 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create Company Table
    await queryRunner.query(`
        CREATE TABLE company (
            id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
            company_name NVARCHAR(255) NOT NULL,
            createdAt DATETIME NOT NULL DEFAULT GETDATE(),
            updatedAt DATETIME NOT NULL DEFAULT GETDATE()
        )
    `);

    // Create User Table
    await queryRunner.query(`
        CREATE TABLE [user] (
            id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
            full_name NVARCHAR(255) NOT NULL,
            cpf NVARCHAR(11) NOT NULL UNIQUE,
            email NVARCHAR(255) NOT NULL UNIQUE,
            password NVARCHAR(255) NOT NULL,
            role NVARCHAR(50) NOT NULL,
            companyId INT NOT NULL,
            createdAt DATETIME NOT NULL DEFAULT GETDATE(),
            updatedAt DATETIME NOT NULL DEFAULT GETDATE(),
            CONSTRAINT FK_company_user FOREIGN KEY (companyId) REFERENCES company(id) ON DELETE CASCADE
        )
    `);

    // Create Representative Table
    await queryRunner.query(`
        CREATE TABLE representative (
            id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
            userId INT NOT NULL,
            cnpj NVARCHAR(20) NOT NULL UNIQUE,
            createdAt DATETIME NOT NULL DEFAULT GETDATE(),
            updatedAt DATETIME NOT NULL DEFAULT GETDATE(),
            CONSTRAINT FK_user_representative FOREIGN KEY (userId) REFERENCES [user](id) ON DELETE CASCADE,
        )
    `);

    // Create Employee Table
    await queryRunner.query(`
        CREATE TABLE employee (
            id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
            userId INT NOT NULL,
            salary DECIMAL(10,2) NOT NULL,
            createdAt DATETIME NOT NULL DEFAULT GETDATE(),
            updatedAt DATETIME NOT NULL DEFAULT GETDATE(),
            CONSTRAINT FK_user_employee FOREIGN KEY (userId) REFERENCES [user](id) ON DELETE CASCADE,
        )
    `);

    // Create Loan Request Table
    await queryRunner.query(`
        CREATE TABLE loan_request (
            id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
            amount DECIMAL(10,2) NOT NULL,
            term INT NOT NULL,
            status NVARCHAR(50) NOT NULL,
            employeeId INT NULL,
            createdAt DATETIME NOT NULL DEFAULT GETDATE(),
            updatedAt DATETIME NOT NULL DEFAULT GETDATE(),
            expireMonth DATETIME NOT NULL,
            startMonth DATETIME NOT NULL,
            CONSTRAINT FK_employee_loan_request FOREIGN KEY (employeeId) REFERENCES employee(id) ON DELETE CASCADE
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE loan_request`);
    await queryRunner.query(`DROP TABLE employee`);
    await queryRunner.query(`DROP TABLE representative`);
    await queryRunner.query(`DROP TABLE [user]`);
    await queryRunner.query(`DROP TABLE company`);
  }
}
