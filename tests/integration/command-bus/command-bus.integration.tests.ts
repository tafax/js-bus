
import { suite, test, Mock, IMock, Times } from '@js-bus/test';
import { of } from 'rxjs';
import { MessageBusAllowMiddleware } from '../../../src/lib/bus/message-bus-allow-middleware';
import { ServiceLocatorAwareCallableResolver } from '../../../src/lib/callable-resolver/service-locator-aware.callable-resolver';
import { MessageHandlingCollection } from '../../../src/lib/collection/message-handling.collection';
import { FunctionConstructorMessageTypeExtractor } from '../../../src/lib/extractor/function-constructor.message-type-extractor';
import { ObservableDelegatesMessageHandlerMiddleware } from '../../../src/lib/handler/observable-delegates-message-handler.middleware';
import { ClassMapHandlerResolver } from '../../../src/lib/resolver/class-map.handler-resolver';
import { CustomError } from '../../fixtures/custom.error';
import { EviCommandForTest } from '../../fixtures/evi-command-for-test';
import { EvilCommandHandlerForTest } from '../../fixtures/evil-command-handler-for-test';
import { GoodCommandForTest } from '../../fixtures/good-command-for-test';
import { GoodCommandHandlerForTest } from '../../fixtures/good-command-handler-for-test';

@suite class CommandBusIntegrationTests {

  private commandBus: MessageBusAllowMiddleware;
  private serviceLocatorMock: IMock<Function>;

  before() {

    this.serviceLocatorMock = Mock.ofType<Function>();

    const messageHandlingCollection = new MessageHandlingCollection([
      { message: GoodCommandForTest, handlers: [ GoodCommandHandlerForTest ] },
      { message: EviCommandForTest, handlers: [ EvilCommandHandlerForTest ] }
    ]);

    const functionExtractor = new FunctionConstructorMessageTypeExtractor();
    const serviceLocatorResolver = new ServiceLocatorAwareCallableResolver(this.serviceLocatorMock.object);

    const classMapHandlerResolver = new ClassMapHandlerResolver(
      messageHandlingCollection,
      serviceLocatorResolver,
      functionExtractor
    );

    this.commandBus = new MessageBusAllowMiddleware([
      new ObservableDelegatesMessageHandlerMiddleware(classMapHandlerResolver)
    ]);
  }

  @test 'should execute the correct command handler'() {

    const command = new GoodCommandForTest();

    this.serviceLocatorMock
      .setup(x => x(GoodCommandHandlerForTest))
      .returns(() => new GoodCommandHandlerForTest())
      .verifiable(Times.once());

    return this.commandBus.handle(command)
      .subscribe(
        () => {
          this.serviceLocatorMock.verifyAll();
        }
      );
  }

  @test 'should execute the correct command handler without subscribing'() {

    const command = new GoodCommandForTest();

    const commandHandlerMock = Mock.ofType(GoodCommandHandlerForTest);

    commandHandlerMock
      .setup(x => x.handle(command))
      .returns(() => of(undefined))
      .verifiable(Times.once());

    this.serviceLocatorMock
      .setup(x => x(GoodCommandHandlerForTest))
      .returns(() => commandHandlerMock.object)
      .verifiable(Times.once());

    const execution$ = this.commandBus.handle(command);

    this.serviceLocatorMock.verifyAll();
    commandHandlerMock.verifyAll();

    return execution$
      .subscribe(() => {
        this.serviceLocatorMock.verifyAll();
        commandHandlerMock.verifyAll();
      });
  }

  @test 'should execute the correct command handler and throws error'() {

    const command = new EviCommandForTest();

    this.serviceLocatorMock
      .setup(x => x(EvilCommandHandlerForTest))
      .returns(() => new EvilCommandHandlerForTest())
      .verifiable(Times.once());

    return this.commandBus.handle(command)
      .subscribe(
        () => { throw new Error('should-not-be-called'); },
        (error: Error) => {
          error.should.be.instanceof(CustomError);

          this.serviceLocatorMock.verifyAll();
        }
      );
  }
}


