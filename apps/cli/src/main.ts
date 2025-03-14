import { CLIApplication } from './app/cli-application';
import { GenerateCommand } from './app/commands/generate.command';
import { HelpCommand } from './app/commands/help.command';

async function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([new HelpCommand(), new GenerateCommand()]);
  cliApplication.processCommand(process.argv);
}

bootstrap();
