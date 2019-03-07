
import { of } from 'rxjs';
import { GoodCommandForTest } from './GoodCommandForTest';

export class ObservableGoodCommandHandlerForTest {
  handle(command: GoodCommandForTest) {
    command.checkProperty.should.be.eql('alright!');
    return of();
  }
}
