enum UserRole {
  customer = 'customer',
  seller = 'seller',
}

interface IUser {
  id?: number;
  firstName?: string;
  lastName?: string;
  login: string;
  password: string;
  role: UserRole;
}

export { UserRole, IUser };
