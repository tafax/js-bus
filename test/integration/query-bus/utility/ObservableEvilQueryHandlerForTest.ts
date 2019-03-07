
import { throwError } from 'rxjs';
import { EvilQueryForTest } from './EvilQueryForTest';
import { CustomError } from './CustomError';

export class ObservableEvilQueryHandlerForTest {
  handle(query: EvilQueryForTest) {
    query.checkProperty.should.be.eql('alright!');
    return throwError(new CustomError());
  }
}
