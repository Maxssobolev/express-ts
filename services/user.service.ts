import { CreateUserDto } from '../shared/dto/create-user.dto';
import { AuthUserDto } from '../shared/dto/auth-user-.dto';
import { User } from '../models/users.model';
import { TEXT } from '../shared/text/text';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class UserService {
  login = async (userDto: AuthUserDto) => {
    const user = await this.getUserByLogin(userDto.login);
    if (!user) {
      return { message: TEXT.errors.loginIncorrect };
    }
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);
    if (passwordEquals) {
      return this.generateToken(user);
    }
  };

  registration = async (userDto: CreateUserDto) => {
    const isUserExist = await this.getUserByLogin(userDto.login);
    if (isUserExist) {
      return { message: TEXT.errors.userAlreadyExist };
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.createUser({ ...userDto, password: hashedPassword });
    return this.generateToken(user);
  };

  getUserByLogin = async (login: string): Promise<User | null> => {
    return await User.findOne({ where: { login } });
  };

  createUser = async (userDto: CreateUserDto) => {
    return await User.create(userDto);
  };

  generateToken = async (user: User) => {
    const payload = {
      id: user.id,
      login: user.login,
      role: user.role,
    };
    return {
      token: jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '24h' }),
    };
  };
}
