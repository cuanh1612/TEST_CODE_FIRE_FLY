import CreateUserDto from "../dtos/create-user.dto";
import FilterUserDto from "../dtos/filter-user.dto";
import UpdateUserDto from "../dtos/update-user.dto";
import { userRepository } from "../repositories";
import { baseError } from "../ultil/base-error";

class UserService {
  async create(createUserDto: CreateUserDto) {
    const newUser = userRepository.create({
      ...createUserDto,
    });
    const userSaved = await userRepository.save(newUser);
    return userSaved;
  }

  async findAll() {
    const users = await userRepository.find();
    return users;
  }

  async filter(filterUserDto: FilterUserDto) {
    const { id } = filterUserDto;
    const user = await userRepository.findOne({
      where: {
        id: id ? id : undefined,
      },
    });
    if (!user)
      throw baseError({
        message: "User not existing in server",
        statusCode: 404,
      });
    return user;
  }

  async findByName(name: string) {
    let query = userRepository.createQueryBuilder("user");

    if (name) {
      query = query
        .where("user.first_name LIKE :name", { name: `${name}%` })
        .orWhere("user.last_name LIKE :name", { name: `${name}%` });
    }
    const users = await query.orderBy("user.first_name", "DESC").getMany();
    return users;
  }

  async update(updateUserDto: UpdateUserDto, id: string) {
    let user = await this.filter({ id });
    if (!user)
      throw baseError({
        message: "User not existing in server",
        statusCode: 404,
      });

    user = {
      ...user,
      ...updateUserDto,
    };

    const userUpdated = await userRepository.save(user);
    return userUpdated;
  }

  async delete(id: string) {
    const user = await this.filter({ id });
    if (!user)
      throw baseError({
        message: "User not existing in server",
        statusCode: 404,
      });
    await userRepository.remove(user);
    return;
  }
}

export default new UserService();
