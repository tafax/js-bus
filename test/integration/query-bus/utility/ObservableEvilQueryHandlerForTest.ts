
import { Observable } from 'rxjs';
import { EvilQueryForTest } from './EvilQueryForTest';
import { CustomError } from './CustomError';

export class ObservableEvilQueryHandlerForTest {
  handle(query: EvilQueryForTest) {
    query.checkProperty.should.be.eql('alright!');
    return Observable.throw(new CustomError('some error')) as Observable<any>;
  }
}
