import { Request, Response, Router } from "express";
import UserController from "../controllers/user.controller";
import CatchAsync from "../ultil/catch-async";

export const userRoute = () => {
  const route = Router();

  route.get("/read", CatchAsync(UserController.findById));

  route.get("/search", CatchAsync(UserController.findByName));

  route.post("/add", CatchAsync(UserController.create));

  route.put("/edit/:id", CatchAsync(UserController.update));

  route.delete("/edit/:id", CatchAsync(UserController.delete));

  route.get("/locate", CatchAsync(UserController.findCloseUsers));

  return route;
};
