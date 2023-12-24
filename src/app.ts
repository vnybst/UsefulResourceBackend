import express, { Request, Response } from "express";
import config from "./config";
import Logger from "./utils/logger";
import SequelizeConnection from "./database/connection";
import { db } from "./database/models";
import userRouter from "./routes/user";
import authRouter from "./routes/authServer";
import categoryRouter from "./routes/category";

const logger = new Logger("main");

async function main() {
  // Connection the database
  await SequelizeConnection.connect();
  db.sequelize.sync();
  const app = express()
    .disable("x-powered-by")
    .enable("trust proxy")
    .use(express.urlencoded({ extended: true }))
    .use(
      express.json({
        limit: "10mb",
      })
    )
    .use("/v1/auth", authRouter())
    .use("/v1/user", userRouter())
    .use("/v1/category", categoryRouter())
    .get("/health", (_req: Request, res: Response) => {
      return res.send("Hello World!");
    });

  const server = app.listen(config.port, () => {
    logger.log(`server listening on http://localhost:${config.port}`);
  });

  const stopServer = () => {
    logger.log("shutting.down");
    server.close();
  };

  process.once("SIGINT", stopServer);
  process.once("SIGTERM", stopServer);
}

main().catch((err) => {
  logger.error("app.init.failed", err);
  process.exit(1);
});
