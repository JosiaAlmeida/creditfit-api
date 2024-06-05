import { DataSource } from 'typeorm';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.NEST_HOST,
  port: Number(process.env.NEST_PORT),
  username: 'sa',
  password: process.env.NEST_PASSWORD,
  database: process.env.NEST_DATABASE,
  entities: [__dirname + '/**/*.entity{.ts,.js}'], // Specify your entity classes here
  synchronize: true,
  options: {
    trustServerCertificate: true,
    encrypt: true,
    enableArithAbort: true,
  },
  migrations: ['src/database/migration/*.ts'],
});
