import { Router } from "express";
import { userRoute } from "./user.route";
export const mainRoute = () => {
  const route = Router();

  route.use("/user", userRoute());

  return route;
};
