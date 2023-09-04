import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthResponse, LoginInput } from './dto/login-auth.input';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async login(loginInput: LoginInput) {
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
        const token = await this.jwtService.signAsync(payload)
        
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
