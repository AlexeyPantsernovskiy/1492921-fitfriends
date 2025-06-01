import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import {
  User,
  CreateUserDto,
  LoginUserDto,
  UserTokenRdo,
  UserRdo,
  UpdateUserDto,
  EMPTY_VALUE,
  UserErrorMessage,
  TokenPayload,
  UserResponse,
  UserRole,
  LimitQuery,
} from '@project/shared-core';
import { jwtConfig } from 'libs/users/config/src';
import { fillDto } from '@project/shared-helpers';

import { RefreshTokenService } from '../refresh-token-module/refresh-token.service';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService
  ) {}

  private createJWTPayload(user: User): TokenPayload {
    return {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }

  public async register(dto: CreateUserDto): Promise<UserRdo> {
    if (await this.userRepository.findByEmail(dto.email)) {
      throw new ConflictException(UserErrorMessage.EmailExists);
    }
    const userEntity = await new UserEntity(dto).setPassword(dto.password);
    const newUser = await this.userRepository.save(userEntity);
    return fillDto(UserRdo, newUser.toPOJO());
  }

  public async updateUser(dto: UpdateUserDto): Promise<UserRdo> {
    const user = await this.userRepository.findById(dto.userId);
    if (!user) {
      throw new ConflictException(UserErrorMessage.UserNotFound);
    }

    const newUser = {
      ...user,
      id: dto.userId,
      avatar: dto.avatar === EMPTY_VALUE ? '' : dto.avatar || user.avatar,
      name: dto.name || user.name,
      description: dto.description,
      location: dto.location || user.location,
      sex: dto.sex || user.sex,
      questionnaire: {
        ...user.questionnaire,
        specialization:
          dto.specialization || user.questionnaire?.specialization,
        level: dto.level || user.questionnaire?.level,
        isReadyToTrain: dto.isReadyToTrain,
      },
    };

    const updateUser = new UserEntity(newUser as User);
    await this.userRepository.update(updateUser);
    return fillDto(UserRdo, updateUser.toPOJO());
  }

  public async verifyUser(dto: LoginUserDto): Promise<UserRdo | null> {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);
    if (!existUser) {
      throw new NotFoundException(UserErrorMessage.UserNotFound);
    }

    if (!(await existUser.comparePassword(password))) {
      throw new UnauthorizedException(UserErrorMessage.PasswordWrong);
    }
    return fillDto(UserRdo, existUser.toPOJO());
  }

  public async getUserById(id: string): Promise<UserRdo | null> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(UserErrorMessage.UserNotFound);
    }
    return fillDto(UserRdo, user.toPOJO());
  }

  public async getUserByEmail(email: string): Promise<UserRdo | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException(UserErrorMessage.UserNotFound);
    }
    return fillDto(UserRdo, user.toPOJO());
  }

  public async createUserToken(user: User): Promise<UserTokenRdo> {
    const accessTokenPayload = this.createJWTPayload(user);
    const refreshTokenPayload = {
      ...accessTokenPayload,
      tokenId: crypto.randomUUID(),
    };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);
    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(
        refreshTokenPayload,
        {
          secret: this.jwtOptions.refreshTokenSecret,
          expiresIn: this.jwtOptions.refreshTokenExpiresIn,
        }
      );
      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException(
        'Ошибка при создании токена.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getUsersReadyToTrain(
    query: LimitQuery
  ): Promise<UserRdo[] | null> {
    const users = await this.userRepository.find(
      {
        role: UserRole.Sportsman,
        'questionnaire.isReadyToTrain': true,
      },
      query.limit
    );
    if (!users.length) {
      throw new NotFoundException(UserResponse.UsersNotFound.description);
    }
    return users.map((user) => fillDto(UserRdo, user.toPOJO()));
  }
}
