import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  // CRUD BEHAVIOR OF USER ENTITY
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string) {
    return this.userRepo.findOne({ where: { userEmail: email } });
  }

  async findById(id: string) {
    return this.userRepo.findOne({ where: { userId: id } });
  }

  async create(userDto: CreateUserDto) {
    const { email, password, name } = userDto;
    const isUserAvailable = await this.findByEmail(email);
    if (isUserAvailable) {
      throw new HttpException({ message: 'User already exists' }, 400);
    }
    const user = this.userRepo.create({
      createdAt: new Date().toISOString(),
      userEmail: email,
      userPassword: password,
      userName: name,
    });
    return this.userRepo.save(user);
  }
}
