
import * as Promise from 'bluebird';
import { GoodQueryForTest } from './GoodQueryForTest';

export class GoodQueryHandlerForTest {
  handle(query: GoodQueryForTest) {
    query.checkProperty.should.be.eql('alright!');
    return Promise.resolve('result-value');
  }
}
