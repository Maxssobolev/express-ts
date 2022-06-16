import { Table, Column, Model } from 'sequelize-typescript';
import { IUser, UserRole } from '../shared/interfaces/user.interface';

@Table({ tableName: 'users' })
export class User extends Model<User, IUser> {
  @Column({ primaryKey: true, unique: true, allowNull: false, autoIncrement: true })
  id: number;

  @Column({ allowNull: true })
  firstName: string;

  @Column({ allowNull: true })
  lastName: string;

  @Column({ comment: 'email / tel', allowNull: false })
  login: string;

  @Column({ allowNull: false })
  password: string;

  @Column({ values: Object.values(UserRole), allowNull: false })
  role: string;
}
