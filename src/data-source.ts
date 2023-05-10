import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.URL_DATABASE,

  synchronize: true,
  logging: false,
  entities: ["build/**/*.entity.js"],
  subscribers: [],
  migrations: [],
});
