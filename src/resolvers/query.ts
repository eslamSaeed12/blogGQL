import { User } from "../schemas/user";
import auth from "../services/auth";
import userRepository from "../repositores/user";

export default {
  profile(_, { token }): Promise<User> {
    return auth.getMyProfile(token);
  },
  login(_, { username, password }): Promise<string> {
    return auth.login({ username, password });
  },

};
