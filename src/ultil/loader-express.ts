import bodyParser from "body-parser";
import express, { Express, NextFunction, Request, Response } from "express";
import { mainRoute } from "../routes";
import { BaseResponse } from "./base-response";
import { ErrorBase } from "./base-error";

export const loaderExpress = (app: Express) => {
  // middleware
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // route
  app.use("/", mainRoute());

  app.use(
    "*",
    (err: ErrorBase, _: Request, res: Response, __: NextFunction) => {
      if (err) {
        const dataRes = new BaseResponse({
          message: err.message,
        });
        return res.status(err?.statusCode || 500).json(dataRes);
      }
    }
  );
};
