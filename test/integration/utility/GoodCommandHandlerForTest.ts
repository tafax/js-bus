
import * as Promise from 'bluebird';
import { GoodCommandForTest } from './GoodCommandForTest';

export class GoodCommandHandlerForTest {
  handle(command: GoodCommandForTest) {
    command.checkProperty.should.be.eql('alright!');
    return Promise.resolve();
  }
}
