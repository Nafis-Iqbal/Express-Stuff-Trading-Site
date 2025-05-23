import User from "../Models/User";

import { safeToJson } from "../Utils/Utilities";

export class UserRepository {
  async findById(id: number) {
    return safeToJson(await User.findByPk(id, {
      attributes: {exclude: ['password_hash']},
    }));
  }

  async findByEmail(email: string) {
    return safeToJson(await User.findOne({
      where: {email}
    }));
  }

  async findAllUsers() {
    return safeToJson(await User.findAll({
      attributes: {exclude: ['password_hash']},
    }));
  }

  async createUser(user_name: string, email: string, password_hash: string) {
    return safeToJson(await User.create({ user_name, email, password_hash }));
  }

  async updateUser(id: number, newUserData: Partial<User>) {
    const [updatedRows] = await User.update(newUserData, {
      where: {id}
    });

    if(updatedRows === 0){
      console.log("User not found");
      return false;
    }
    else{
      console.log("User updated successfully");
      return true;
    }
  }

  async deleteUser(id: number) {
    const deletedRows = await User.destroy({
      where: {id}
    });

    if(deletedRows === 0){
      console.log("User not found");
      return false;
    }
    else{
      console.log("User deleted successfully");
      return true;
    }
  }
}
