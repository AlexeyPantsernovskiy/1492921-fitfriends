import chalk from 'chalk';
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker/locale/ru';
import { Logger } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

import {
  Duration,
  DURATIONS,
  Level,
  LEVELS,
  LOCATIONS,
  Questionnaire,
  QuestionnaireUserProperty,
  Sex,
  SEX,
  Specialization,
  SPECIALIZATIONS,
  Training,
  UserAuth,
  UserRole,
} from '@project/shared-core';
import { UserEntity, UserSchema } from '@project/user';

import { Command } from './command.interface';
import {
  MOCK_TRAININGS,
  MOCK_USER_PASSWORD,
  MOCK_USERS,
} from './command.constant';

import { getErrorMessage } from '@project/shared-helpers';

export class GenerateCommand implements Command {
  private users: UserAuth[] = [];
  private trainings: Training[] = [];

  private setTrainings(count: number) {
    for (let i = 0; i < count; i++) {
      const training = faker.helpers.arrayElement([
        ...MOCK_TRAININGS,
      ]) as Training;
      this.trainings.push({
        ...training,
        image: `default/training-${faker.number.int({ min: 1, max: 4 })}.png`,
        duration: faker.helpers.arrayElement([...DURATIONS]) as Duration,
        price: training.price ?? faker.number.int({ min: 0, max: 1700 }),
        calories: faker.number.int({
          min: QuestionnaireUserProperty.CaloriesLose.Validate.Min,
          max: QuestionnaireUserProperty.CaloriesLose.Validate.Max,
        }),
        sex: faker.helpers.arrayElement(SEX) as Sex,
        video: `default/video.mp4`,
        rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
        coachId: faker.helpers.arrayElement(
          this.users.filter((item) => item.role === UserRole.Coach)
        ).id,
        isSpecialOffer: faker.datatype.boolean(),
        createDate: faker.date.between({
          from: '2020-01-01T00:00:00.000Z',
          to: new Date(),
        }),
      });
    }
  }

  private setUsers() {
    for (let i = 0; i < MOCK_USERS.length - 1; i++) {
      // Генерация Опросника
      const questionnaire: Questionnaire = {
        specialization: faker.helpers.arrayElements(SPECIALIZATIONS, {
          min: 1,
          max: 3,
        }) as Specialization[],
        duration: faker.helpers.arrayElement(DURATIONS) as Duration,
        level: faker.helpers.arrayElement(LEVELS) as Level,
        caloriesLose: faker.number.int({ min: 1000, max: 5000 }),
        caloriesWaste: faker.number.int({ min: 1000, max: 5000 }),
        isReadyToTrain: faker.datatype.boolean(),
      };
      const role = faker.helpers.arrayElement(Object.values(UserRole));
      const user: UserAuth = {
        name: MOCK_USERS[i],
        email: faker.internet.email(),
        avatar: `default/avatars/photo-${faker.number.int({ min: 1, max: 5 })}.png`,
        sex: faker.helpers.arrayElement(SEX) as Sex,
        birthday: faker.date.birthdate(),
        description: '',
        location: faker.helpers.arrayElement(LOCATIONS),
        photo1:
          role === UserRole.Sportsman
            ? 'default/user-card-photo1.jpg'
            : 'default/user-coach-photo1.jpg',
        photo2:
          role === UserRole.Sportsman
            ? 'default/user-card-photo2.jpg'
            : 'default/user-coach-photo2.jpg',
        registerDate: faker.date.past(),
        role: role,
        passwordHash: '',
      };
      this.users.push({
        ...user,
        questionnaire: questionnaire,
      });
    }
  }

  private async createUsers(connectionString: string) {
    await mongoose.connect(connectionString);
    const userModel = mongoose.model('users', UserSchema);
    await userModel.deleteMany({});
    try {
      for (const user of this.users) {
        const userEntity = new UserEntity(user);
        await userEntity.setPassword(MOCK_USER_PASSWORD);
        const newUser = await userModel.create(userEntity.toPOJO());
        user.id = newUser.id;
      }
      console.info(
        `🤘️ ${chalk.green(`В базу данных успешно добавлено ${this.users.length} пользователей`)}`
      );
    } finally {
      await mongoose.disconnect();
    }
  }

  private async createTrainings(connectionString: string) {
    const prismaClient = new PrismaClient({ datasourceUrl: connectionString });
    await prismaClient.training.deleteMany();
    try {
      for (const training of this.trainings) {
        await prismaClient.training.create({ data: training });
      }
      console.info(
        `🤘️ ${chalk.green(`В базу данных успешно добавлено ${this.trainings.length} тренировок`)}`
      );
    } finally {
      await prismaClient.$disconnect();
    }
  }

  public getName(): string {
    return '--generate';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, connectionMongoDb, connectionPostgres] = parameters;
    // Создание пользователей
    try {
      this.setUsers();
      await this.createUsers(connectionMongoDb);
    } catch (error: unknown) {
      Logger.error(
        `\nПроизошла ошибка при попытке создать пользователей\n` +
          `${chalk.white('Причина: ')}${chalk.yellow(getErrorMessage(error))}`
      );
      process.exit(1);
    }
    // Создание тренировок
    const countRecords = Number.parseInt(count, 10);
    if (!countRecords || countRecords <= 0) {
      Logger.error(
        `Количество тренировок [${count}] должно быть положительным числом`
      );
      process.exit(1);
    }
    try {
      this.setTrainings(countRecords);
      await this.createTrainings(connectionPostgres);
      process.exit(0);
    } catch (error: unknown) {
      Logger.error(
        `\nПроизошла ошибка при попытке создать товары\n${chalk.white('Причина: ')}${chalk.yellow(getErrorMessage(error))}`
      );
      process.exit(1);
    }
  }
}
