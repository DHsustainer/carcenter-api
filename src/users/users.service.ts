import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const checkUserExists = await this.userRepository.findOne({
        where: { username: createUserDto.username },
      });

      if (checkUserExists) {
        return {
          statusCode: HttpStatus.FOUND,
          message: 'User already exists',
        };
      }

      const role = await this.roleRepository.findOne({
        where: { name: 'Administrator' },
      });

      const newUser = await this.userRepository.create(createUserDto);

      
      const hash = await bcrypt.hash(createUserDto.password, 10);
      
      newUser.role = role
      newUser.password = hash;

      const createUser = await this.userRepository.save(newUser);

      if (createUser) {
        return {
          statusCode: 200,
          message: 'Register Successfull',
        };
      }
    } catch (error) {
      throw new HttpException(
        `Server error :: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    return this.userRepository.find({
      relations: ['role']
    });
  }


  async findOne(id: string) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    return this.userRepository.delete(id);
  }
}
