import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

class UserController {
  private userService: UserService = new UserService();

  login = async (req: Request, res: Response) => {
    const { login, password } = req.body;
    const resp = await this.userService.login({ login, password });
    return res.json(resp);
  };

  registration = async (req: Request, res: Response) => {
    const { login, password, role } = req.body;
    const resp = await this.userService.registration({ login, password, role });
    return res.json(resp);
  };
}

export default new UserController();
