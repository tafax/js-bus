
import { EvilCommandForTest } from './EvilCommandForTest';
import { CustomError } from './CustomError';
import { Observable } from 'rxjs';

export class ObservableEvilCommandHandlerForTest {
  handle(command: EvilCommandForTest) {
    command.checkProperty.should.be.eql('alright!');
    return Observable.throw(new CustomError()) as Observable<any>;
  }
}
