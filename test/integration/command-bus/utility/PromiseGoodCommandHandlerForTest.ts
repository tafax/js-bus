
import * as Promise from 'bluebird';
import { GoodCommandForTest } from './GoodCommandForTest';

export class PromiseGoodCommandHandlerForTest {
  handle(command: GoodCommandForTest) {
    command.checkProperty.should.be.eql('alright!');
    return Promise.resolve();
  }
}
