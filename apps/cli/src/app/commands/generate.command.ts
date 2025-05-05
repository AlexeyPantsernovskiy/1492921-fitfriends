import chalk from 'chalk';
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker/locale/ru';
import { Logger } from '@nestjs/common';

import { PaymentType, PrismaClient } from '@prisma/client';

import {
  Duration,
  DURATIONS,
  Level,
  LEVELS,
  LOCATIONS,
  OrderType,
  Sex,
  SEX,
  Specialization,
  SPECIALIZATIONS,
  Training,
  TrainingLimit,
  TrainingOrder,
  TrainingProperty,
  UserAuth,
  UserLimit,
  UserRole,
} from '@project/shared-core';
import { UserEntity, UserSchema } from '@project/user';

import { Command } from './command.interface';
import {
  MOCK_ACHIEVEMENTS,
  MOCK_CERTIFICATE_COUNT,
  MOCK_TRAININGS,
  MOCK_USER_PASSWORD,
  MOCK_USERS,
} from './command.constant';

import { getErrorMessage } from '@project/shared-helpers';

export class GenerateCommand implements Command {
  private users: UserAuth[] = [];
  private trainings: Training[] = [];
  private orders: TrainingOrder[] = [];

  private setTrainings(count: number) {
    for (let i = 0; i < count; i++) {
      const training = faker.helpers.arrayElement([
        ...MOCK_TRAININGS,
      ]) as Training;
      this.trainings.push({
        ...training,
        image: `default/training-${faker.number.int({ min: 1, max: 4 })}.jpg`,
        duration: faker.helpers.arrayElement([...DURATIONS]) as Duration,
        price:
          training.price ??
          faker.number.int({ min: TrainingLimit.Price.Min, max: 1700 }),
        calories: faker.number.int({
          min: TrainingLimit.Calories.Min,
          max: TrainingLimit.Calories.Max,
        }),
        sex: faker.helpers.arrayElement(SEX) as Sex,
        video: `default/video.mp4`,
        rating: faker.number.float({
          min: TrainingProperty.Rating.Validate.Min,
          max: TrainingProperty.Rating.Validate.Max,
          fractionDigits: 1,
        }),
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
      const role = faker.helpers.arrayElement(Object.values(UserRole));

      const questionnaire = {
        specialization: faker.helpers.arrayElements(SPECIALIZATIONS, {
          min: UserLimit.Specialization.MinCount,
          max: UserLimit.Specialization.MaxCount,
        }) as Specialization[],
        level: faker.helpers.arrayElement(LEVELS) as Level,
        isReadyToTrain: faker.datatype.boolean(),
      };

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
      if (user.role === UserRole.Sportsman) {
        this.users.push({
          ...user,
          questionnaire: {
            ...questionnaire,
            duration: faker.helpers.arrayElement(DURATIONS) as Duration,
            caloriesLose: faker.number.int({
              min: UserLimit.CaloriesLose.Min,
              max: UserLimit.CaloriesLose.Max,
            }),
            caloriesWaste: faker.number.int({
              min: UserLimit.CaloriesWaste.Min,
              max: UserLimit.CaloriesWaste.Max,
            }),
          },
        });
      }
      if (user.role === UserRole.Coach) {
        this.users.push({
          ...user,
          questionnaire: {
            ...questionnaire,
            certificates: Array.from(
              {
                length: faker.number.int({
                  min: 1,
                  max: MOCK_CERTIFICATE_COUNT,
                }),
              },
              () =>
                `default/certificate-${faker.number.int({ min: 1, max: MOCK_CERTIFICATE_COUNT })}.pdf`
            ),
            achievements: faker.helpers.arrayElement(MOCK_ACHIEVEMENTS),
          },
        });
      }
    }
  }

  private setOrders(count: number) {
    const randomCountTraining = faker.number.int({ min: 1, max: count });
    const sportsmans = this.users.filter(
      (item) => item.role === UserRole.Sportsman
    );
    let id = 1;
    for (let i = 0; i < randomCountTraining; i++) {
      const training = faker.helpers.arrayElement(this.trainings) as Training;
      const randomCountUsers = faker.number.int({
        min: 1,
        max: sportsmans.length,
      });
      for (let j = 0; j < randomCountUsers; j++) {
        const user = faker.helpers.arrayElement(sportsmans) as UserAuth;
        if (
          !this.orders.find(
            (item) => item.userId === user.id && item.trainingId === training.id
          )
        ) {
          const quantity = faker.number.int({
            min: TrainingLimit.Quantity.Min,
            max: TrainingLimit.Quantity.Max,
          });
          const doneCount = faker.number.int({
            min: 0,
            max: quantity,
          });
          this.orders.push({
            id,
            type: faker.helpers.arrayElement(
              Object.values(OrderType)
            ) as OrderType,
            trainingId: training.id,
            userId: user.id,
            price: training.price,
            quantity,
            amount: quantity * training.price,
            paymentType: faker.helpers.arrayElement(
              Object.values(PaymentType)
            ) as PaymentType,
            isStarted: faker.datatype.boolean(),
            doneCount,
            isDone: quantity === doneCount,
            createDate: faker.date.between({
              from: training.createDate,
              to: new Date(),
            }),
          });
          id = id + 1;
        }
      }
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
        const newTraining = await prismaClient.training.create({
          data: training,
        });
        training.id = newTraining.id;
      }
      console.info(
        `🤘️ ${chalk.green(`В базу данных успешно добавлено ${this.trainings.length} тренировок`)}`
      );
    } finally {
      await prismaClient.$disconnect();
    }
  }

  private async createOrders(connectionString: string) {
    const prismaClient = new PrismaClient({ datasourceUrl: connectionString });
    await prismaClient.order.deleteMany();
    try {
      for (const order of this.orders) {
        await prismaClient.order.create({ data: order });
      }
      console.info(
        `🤘️ ${chalk.green(`В базу данных успешно добавлены заказы - ${this.orders.length} шт.`)}`
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
    } catch (error: unknown) {
      Logger.error(
        `\nПроизошла ошибка при попытке создать тренировки\n${chalk.white('Причина: ')}${chalk.yellow(getErrorMessage(error))}`
      );
      process.exit(1);
    }
    // Создание заказов
    try {
      this.setOrders(countRecords);
      await this.createOrders(connectionPostgres);
      process.exit(0);
    } catch (error: unknown) {
      Logger.error(
        `\nПроизошла ошибка при попытке создать заказы тренировок\n${chalk.white('Причина: ')}${chalk.yellow(getErrorMessage(error))}`
      );
      process.exit(1);
    }
  }
}
