import { NextFunction, Request, Response } from "express";

function CatchAsync(
  func: (req: Request, res: Response, next: NextFunction) => void
) {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(func(req, res, next))
      .then((data) => res.status(200).json(data))
      .catch((err: Error) => {
        if (err.message.includes("invalid input syntax for type uuid")) {
          err.message = "Resource not found";
        }

        return next(err);
      });
  };
}

export default CatchAsync;
