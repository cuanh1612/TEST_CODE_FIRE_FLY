import CreateUserDto from "../dtos/create-user.dto";
import FilterUserDto from "../dtos/filter-user.dto";
import UpdateUserDto from "../dtos/update-user.dto";
import { User } from "../entities/user.entity";
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

  async findCloseUsers(n: number, userId: string) {
    const user = await this.filter({ id: userId });
    if (!user)
      throw baseError({
        message: "User not existing in server",
        statusCode: 404,
      });

    // find close users sorted by distance from near to far for users with id equal to userId
    const nearbyUsers = await userRepository
      .createQueryBuilder("user")
      .select()
      .where("user.id != :userId", { userId })
      .orderBy(
        `ABS(SUBSTRING(user.coordinate, 1, 3)::integer - SUBSTRING(:coordinate, 1, 3)::integer)
               + ABS(SUBSTRING(user.coordinate, 5, 3)::integer - SUBSTRING(:coordinate, 5, 3)::integer)`
      )
      .setParameter("coordinate", user.coordinate)
      .getMany();

    console.log(nearbyUsers);

    return nearbyUsers;
  }
}

export default new UserService();
