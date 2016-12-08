
import * as Promise from 'bluebird';
import { EvilQueryForTest } from './EvilQueryForTest';
import { CustomError } from './CustomError';

export class EvilQueryHandlerForTest {
  handle(query: EvilQueryForTest) {
    query.checkProperty.should.be.eql('alright!');
    return Promise.reject(new CustomError('some error'));
  }
}
