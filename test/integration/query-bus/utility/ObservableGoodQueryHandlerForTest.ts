
import { of } from 'rxjs';
import { GoodQueryForTest } from './GoodQueryForTest';

export class ObservableGoodQueryHandlerForTest {
  handle(query: GoodQueryForTest) {
    query.checkProperty.should.be.eql('alright!');
    return of('result-value');
  }
}
