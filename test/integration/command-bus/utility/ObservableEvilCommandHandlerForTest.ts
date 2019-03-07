
import { throwError } from 'rxjs';
import { EvilCommandForTest } from './EvilCommandForTest';
import { CustomError } from './CustomError';

export class ObservableEvilCommandHandlerForTest {
  handle(command: EvilCommandForTest) {
    command.checkProperty.should.be.eql('alright!');
    return throwError(new CustomError());
  }
}
