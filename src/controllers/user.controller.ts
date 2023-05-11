import { Request, Response } from "express";
import { BaseResponse } from "../ultil/base-response";
import CreateUserDto from "../dtos/create-user.dto";
import UserService from "../services/user.service";
import UpdateUserDto from "../dtos/update-user.dto";
import { validatePlainToClass } from "../ultil/class-validate";
import { baseError } from "../ultil/base-error";

class UserController {
  async create(req: Request<any, any, CreateUserDto>, res: Response) {
    // validate data
    await validatePlainToClass(req.body, CreateUserDto);

    // create new user
    const user = await UserService.create(req.body);
    return new BaseResponse({
      message: "Create user success",
      data: user,
    });
  }

  async findById(req: Request, res: Response) {
    const { id } = req.query;

    // find all users
    if (!id) {
      const users = await UserService.findAll();
      return new BaseResponse({
        message: "Get users success",
        data: users,
      });
    }

    // find user by id
    const user = await UserService.filter({
      id: id as string,
    });
    return new BaseResponse({
      message: "Get user success",
      data: user,
    });
  }

  async findByName(req: Request, res: Response) {
    // find user by name
    const { name } = req.query;
    const users = await UserService.findByName(name as string);
    return new BaseResponse({
      message: "Get user success",
      data: users,
    });
  }

  async findAll(_: Request, res: Response) {
    const users = await UserService.findAll();
    return new BaseResponse({
      message: "Get all users success",
      data: users,
    });
  }

  async update(req: Request<any, any, UpdateUserDto>, res: Response) {
    // validate data
    await validatePlainToClass(req.body, UpdateUserDto);

    // check id
    const { id } = req.params;
    if (!id) {
      throw baseError({
        message: "User not existing in server",
        statusCode: 404,
      });
    }

    // update user
    const userUpdated = await UserService.update(req.body, id);
    return new BaseResponse({
      message: "Update user success",
      data: userUpdated,
    });
  }

  async delete(req: Request, res: Response) {
    // check id
    const { id } = req.params;
    if (!id)
      throw baseError({
        message: "User not existing in server",
        statusCode: 404,
      });

    // delete user
    await UserService.delete(id);
    return new BaseResponse({
      message: "Delete user success",
    });
  }

  async findCloseUsers(req: Request, res: Response) {
    const { n = 0, userId } = req.query;

    // check id
    if (!userId)
      throw baseError({
        message: "User not existing in server",
        statusCode: 404,
      });

    // find close users sorted by distance from near to far for users with id equal to userId
    const users = await UserService.findCloseUsers(Number(n), userId as string);

    return new BaseResponse({
      message: "Find close users success",
      data: users,
    });
  }
}

export default new UserController();
