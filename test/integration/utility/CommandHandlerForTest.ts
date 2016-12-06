
import { CommandForTest } from './CommandForTest';

export class CommandHandlerForTest {
  handle(command: CommandForTest) {
    command.checkProperty.should.be.eql('alright!');
  }
}
