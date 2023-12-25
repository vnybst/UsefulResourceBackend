import { config as configDotEnv } from "dotenv";

configDotEnv();
const ENV = process.env;

function must(envName: string): string {
  if (ENV[envName]) return <string>ENV[envName];
  else throw new Error(`environment.variable.missing ${envName}`);
}

export default {
  isDev: ENV.NODE_ENV === "development",
  port: parseInt(ENV.PORT || "3000", 10),
  authSecretKey: must("ACCESS_TOKEN_SECRET"),
  refreshSecretKey: must("REFRESH_TOKEN_SECRET"),
  dbName: must("DB_NAME"),
  dbPort: must("DB_PORT"),
  dbHost: must("DB_HOST"),
  dbUserName: must("DB_USER"),
  dbPassword: must("DB_PASSWORD"),
  dbDialect: "mysql2",
  dbLogging: true,
  dbMaxPoolSize: 10,
  dbPoolAcquireTimeout: 30000,
  dbPoolIdleConnectionTime: 600000,
  dbSslModeRequire: false,
};
