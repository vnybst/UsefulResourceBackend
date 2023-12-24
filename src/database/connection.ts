import { Options, Sequelize } from "sequelize";
import config from "../config";
import Logger from "../utils/logger";
const logger = new Logger("SequelizeConnection");

class SequelizeConnection {
  private static instance: Sequelize;
  static getInstance(): Sequelize {
    if (!SequelizeConnection.instance) {
      const dbConfig = {} as Options;
      dbConfig.port = parseInt(config.dbPort, 10);
      dbConfig.host = config.dbHost;
      dbConfig.ssl = false;
      dbConfig.database = config.dbName;
      dbConfig.username = config.dbUserName;
      dbConfig.password = config.dbPassword;
      dbConfig.logging = false;
      dbConfig.dialect = "mysql";
      dbConfig.pool = {
        max: 10,
        acquire: 30000,
        idle: 600000,
      };
      if (config.dbSslModeRequire) {
        dbConfig.dialectOptions = {
          ssl: {
            require: false,
            rejectUnauthorized: false,
          },
        };
      }

      SequelizeConnection.instance = new Sequelize(dbConfig);
    }

    return SequelizeConnection.instance;
  }

  static async connect(): Promise<Sequelize> {
    const sequelize = SequelizeConnection.getInstance();
    try {
      await sequelize.authenticate();
      logger.log("Database connection authenticated successfully");
      return sequelize;
    } catch (ex) {
      logger.log(
        "Error while creation connection to database :: " + ex.message
      );
      return sequelize;
    }
  }

  static async close(): Promise<Sequelize> {
    const sequelize = SequelizeConnection.getInstance();
    try {
      await sequelize.close();
      logger.log("Database connection closed successfully");
      return sequelize;
    } catch (ex) {
      logger.log("Error while closing database connection :: " + ex.message);
      return sequelize;
    }
  }
}

export default SequelizeConnection;
