import UsersModel from '../models/user.js';

class UsersService {
  async registerUser(body) {
    const { email, password } = body;
    const user = new UsersModel({ email, password });
    await user.save();
    return { email };
  }
}

export const usersService = new UsersService();
