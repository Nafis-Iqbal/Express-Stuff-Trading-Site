import { Dialect } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

interface IDBConfig {
  [key: string]: {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: Dialect;
    port?: number;
  };
}

const config: IDBConfig = {
  development: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "1234",
    database: process.env.DB_NAME || "task_manager_db_exp",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    port: Number(process.env.DB_PORT) || 3306,
  },
  test: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "1234",
    database: process.env.DB_NAME || "test_db",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    port: Number(process.env.DB_PORT) || 3306,
  },
  production: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "prod_password",
    database: process.env.DB_NAME || "prod_db",
    host: process.env.DB_HOST || "prod_host",
    dialect: "mysql",
    port: Number(process.env.DB_PORT) || 3306,
  },
};

export default config;
module.exports = config;
