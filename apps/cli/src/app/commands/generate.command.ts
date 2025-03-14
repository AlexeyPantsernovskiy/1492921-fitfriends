import * as crypto from 'node:crypto';
import chalk from 'chalk';
import mongoose, { Schema } from 'mongoose';
import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { Guitar, GuitarType } from '@project/shared-core';
import { UserEntity } from '@project/user';

import { Command } from './command.interface';
import { CreateDatePeriod, GUITARS, USER_ADMIN } from './command.constant';

import {
  getErrorMessage,
  getRandomDate,
  getRandomItem,
} from '@project/shared-helpers';

export class GenerateCommand implements Command {
  private getGuitar(): Guitar {
    const product = getRandomItem(GUITARS);
    return {
      id: crypto.randomUUID(),
      name: product.name,
      description: product.description,
      createDate: getRandomDate(CreateDatePeriod.Begin, CreateDatePeriod.End),
      photo: `guitars/${product.typeCode}-${product.countStrings}.png`,
      typeCode: product.typeCode as GuitarType,
      countStrings: product.countStrings,
      barcode: product.barcode,
      price: product.price,
    };
  }

  private getProducts(length: number) {
    return Array.from({ length }, this.getGuitar);
  }

  private async createUserAdmin(connectionString: string) {
    await mongoose.connect(connectionString);
    const admin = new UserEntity({
      email: USER_ADMIN.email,
      name: USER_ADMIN.name,
      passwordHash: '',
    });
    await admin.setPassword(USER_ADMIN.password);

    const userModel = mongoose.model(
      'users',
      new Schema({
        email: String,
        name: String,
        passwordHash: String,
      })
    );

    const user = await userModel.findOne({ email: USER_ADMIN.email }).exec();

    if (user) {
      console.info(
        `${chalk.green(`Пользователь ${USER_ADMIN.name} (email: ${USER_ADMIN.email}, пароль: ${USER_ADMIN.password}) найден в базе данных!`)}`
      );
      return;
    }
    await userModel.create(admin.toPOJO());
    console.info(
      `${chalk.green(`Пользователь ${USER_ADMIN.name} (email: ${USER_ADMIN.email}, пароль: ${USER_ADMIN.password}) успешно создан!`)}`
    );
  }

  private async createProducts(products: Guitar[], connectionString: string) {
    const prismaClient = new PrismaClient({ datasourceUrl: connectionString });
    try {
      for (const product of products) {
        await prismaClient.guitar.create({ data: product });
      }
      console.info(
        `🤘️ ${chalk.green(`В базу данных успешно добавлено ${products.length} товаров`)}`
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
    // Создание пользователя admin
    try {
      await this.createUserAdmin(connectionMongoDb);
    } catch (error: unknown) {
      Logger.error(
        `\nПроизошла ошибка при попытке создать или найти пользователя ${USER_ADMIN.name}\n` +
          `${chalk.white('Причина: ')}${chalk.yellow(getErrorMessage(error))}`
      );
      process.exit(1);
    }
    // Создание товаров
    const countProduct = Number.parseInt(count, 10);
    if (!countProduct || countProduct <= 0) {
      Logger.error(
        `Количество товаров [${count}] должно быть положительным числом`
      );
      process.exit(1);
    }
    try {
      const products = this.getProducts(countProduct);
      await this.createProducts(products, connectionPostgres);
      process.exit(0);
    } catch (error: unknown) {
      Logger.error(
        `\nПроизошла ошибка при попытке создать товары\n${chalk.white('Причина: ')}${chalk.yellow(getErrorMessage(error))}`
      );
      process.exit(1);
    }
  }
}
