import { Command } from './command.interface.js';
import chalk from 'chalk';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async execute(..._parameters: string[]): Promise<void> {
    console.info(
      `Программа для подготовки данных для REST API сервера.\n` +
        `  ${chalk.white.bold('Пример:')}\n` +
        `    ${chalk.yellow('main.cli.js')} ${chalk.cyan('--<command>')} [${chalk.greenBright.italic('arguments')}]\n` +
        `  ${chalk.white.bold('Команды:')}\n` +
        `    # печатает этот текст\n` +
        `    ${chalk.cyanBright.italic('--help')}\n` +
        `    # генерирует записи о товарах и добавляет их в базу данных\n` +
        `    ${chalk.cyanBright.italic('--generate')} ${chalk.greenBright.italic('<n> <connection MongoDb> <connection Postgres>')}\n` +
        `      ${chalk.greenBright.italic('<n>')}                    — количество товаров для генерации\n` +
        `      ${chalk.greenBright.italic('<connection MongoDb>')}   — строка подключения к базе MongoDb\n` +
        `      ${chalk.greenBright.italic('<connection Postgres>')}  — строка подключения к базе Postgres`
    );
  }
}
