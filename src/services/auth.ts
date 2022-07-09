import { compareSync } from "bcryptjs";
import userRepository from "../repositores/user";
import jwt from "./jwt";

class authService {
  async login({ username, password }) {
    const usr = await userRepository.findByUsername(username);

    if (!usr) {
      throw new Error("User not found");
    }

    const isValid = compareSync(password, usr.password);

    if (!isValid) {
      throw new Error("Invalid password");
    }

    return jwt.sign({
      id: usr._id.toString(),
      username: usr.username,
      email: usr.email,
    });
  }

  async register({ username, email, password }) {
    const user = await userRepository.create({
      email,
      username,
      password,
    });

    return user;
  }

  async getMyProfile(token: string) {
    const { id } = jwt.verify(token);

    return userRepository.findById(id);
  }
}

export default new authService();
