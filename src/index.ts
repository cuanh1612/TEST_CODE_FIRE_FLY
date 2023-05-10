import * as dotenv from "dotenv";
import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { loaderExpress } from "./ultil/loader-express";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// connect db
AppDataSource.initialize()
  .then(() => {
    console.log("Connect db success");
  })
  .catch((error) => console.log("Connect db error", error));

// load setup express
loaderExpress(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
