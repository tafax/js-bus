
import * as Promise from 'bluebird';
import { EvilCommandForTest } from './EvilCommandForTest';
import { CustomError } from './CustomError';

export class PromiseEvilCommandHandlerForTest {
  handle(command: EvilCommandForTest) {
    command.checkProperty.should.be.eql('alright!');
    return Promise.reject(new CustomError('some error'));
  }
}
