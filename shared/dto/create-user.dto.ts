import { UserRole } from '../interfaces/user.interface';

export class CreateUserDto {
  readonly login: string;
  readonly password: string;
  readonly role: UserRole;
}
