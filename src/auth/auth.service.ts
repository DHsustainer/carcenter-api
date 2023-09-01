import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthResponse, LoginInput } from './dto/login-auth.input';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async login(loginInput: LoginInput) {
    console.log(loginInput)
    try {
      const user = await this.userRepository.findOne({
        where: {
          username: loginInput.username
        },
        relations: ['role']
      })

      if (!user) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Wrong username'
        }
      }

      const matchPassword = await bcrypt.compare(
        loginInput.password,
        user.password
      );

      if (matchPassword) {
        const payload = {
          id: user.id,
          username: user.username,
          rol: user.role
        }
    
        const token = jwt.sign(
          payload,
          'e4426809-3319-4a19-24ba-07f557eed285',
          {
            expiresIn: '8h',
        })
        
        return {
          username: user.username,
          role: user.role,
          token
        }
      } else {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Wrong password'
        }
      }
    } catch (error) {
      throw new HttpException(
        `Server error :: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
