import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from './user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import constants from './constants';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  // authentication related logic
  registerUser(userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }

  private async validateUser(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;
      const user = await this.userService.findByEmail(email);
      if (!user) {
        throw new HttpException({ message: 'User not found' }, 400);
      }
      const isVerified = await bcrypt.compare(password, user.userPassword);
      if (!isVerified) {
        throw new HttpException({ message: 'Invalid login details' }, 400);
      }
      return Promise.resolve(user);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async login(loginDto: LoginDto) {
    return this.validateUser(loginDto).then((user) => {
      // validating the user
      const payload = { sub: user.userId, email: user.userEmail };
      // generate token
      const token = this.jwtService.sign(payload);
      return Promise.resolve({
        message: 'Login successful',
        access_token: token,
        expiresIn: constants.EXPIRATION_TIME * 60,
      });
    });
  }
}
