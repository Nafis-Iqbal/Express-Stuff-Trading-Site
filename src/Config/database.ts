import { Dialect, Sequelize } from "sequelize";
import config from "./dbconfig";

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: 'mysql' as Dialect,
    port: dbConfig.port,
    logging: false, // Disable logs in production
  }
);

export default sequelize; // Export the instance
