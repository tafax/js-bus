
import { MessageHandler } from '../../../src/Handler/Metadata/Decorators/MessageHandlerDecorator';
import { CommandHandlerForTest } from './CommandHandlerForTest';

@MessageHandler(CommandHandlerForTest)
export class CommandForTest {
  checkProperty: string = 'alright!';
}
