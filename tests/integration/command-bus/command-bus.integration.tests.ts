
import { suite, test, Mock, IMock, Times } from '@js-bus/test';
import { MessageBusAllowMiddleware } from '../../../src/lib/bus/message-bus-allow-middleware';
import { ServiceLocatorAwareCallableResolver } from '../../../src/lib/callable-resolver/service-locator-aware.callable-resolver';
import { MessageHandlingCollection } from '../../../src/lib/collection/message-handling.collection';
import { FunctionConstructorMessageTypeExtractor } from '../../../src/lib/extractor/function-constructor.message-type-extractor';
import { ObservableDelegatesMessageHandlerMiddleware } from '../../../src/lib/handler/observable-delegates-message-handler.middleware';
import { ClassMapHandlerResolver } from '../../../src/lib/resolver/class-map.handler-resolver';

import { GoodCommandHandlerForTest } from './utility/good-command-handler-for-test';
import { GoodCommandForTest } from './utility/good-command-for-test';
import { EviCommandForTest } from './utility/evi-command-for-test';
import { EvilCommandHandlerForTest } from './utility/evil-command-handler-for-test';
import { CustomError } from './utility/custom.error';

@suite class CommandBusIntegrationTests {

  private commandBus: MessageBusAllowMiddleware;
  private serviceLocatorMock: IMock<Function>;

  before() {

    this.serviceLocatorMock = Mock.ofType<Function>();

    const messageHandlingCollection = new MessageHandlingCollection([
      { message: GoodCommandForTest, handler: GoodCommandHandlerForTest },
      { message: EviCommandForTest, handler: EvilCommandHandlerForTest }
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

  @test 'should execute the correct command handler and fulfill'() {

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

  @test 'should execute the correct command handler and reject'() {

    const command = new EviCommandForTest();

    this.serviceLocatorMock
      .setup(x => x(EvilCommandHandlerForTest))
      .returns(() => new EvilCommandHandlerForTest())
      .verifiable(Times.once());

    return this.commandBus.handle(command)
      .subscribe(
        () => { throw new Error('should-not-be-called'); },
        (error: Error) => { error.should.be.instanceof(CustomError); }
      );
  }
}


