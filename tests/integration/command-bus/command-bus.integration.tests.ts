
import { suite, test, Mock, IMock, Times } from '@js-bus/test';
import { of } from 'rxjs';
import { MessageBus } from '../../../src/lib/bus/message-bus';
import { ServiceLocatorAwareHandlerResolver } from '../../../src/lib/message-handler/handler-resolver/service-locator-aware.handler-resolver';
import { ClassMapHandlerMapper } from '../../../src/lib/message-handler/mapper/class-map/class-map.handler-mapper';
import { MessageHandlingCollection } from '../../../src/lib/message-handler/mapper/class-map/collection/message-handling.collection';
import { FunctionConstructorMessageTypeExtractor } from '../../../src/lib/message-handler/mapper/class-map/extractor/function-constructor.message-type-extractor';
import { MessageHandlerMiddleware } from '../../../src/lib/message-handler/message-handler.middleware';
import { CustomError } from '../../fixtures/custom.error';
import { EviCommandForTest } from '../../fixtures/evi-command-for-test';
import { EvilCommandHandlerForTest } from '../../fixtures/evil-command-handler-for-test';
import { GoodCommandForTest } from '../../fixtures/good-command-for-test';
import { GoodCommandHandlerForTest } from '../../fixtures/good-command-handler-for-test';

@suite class CommandBusIntegrationTests {

  private commandBus: MessageBus;
  private serviceLocatorMock: IMock<Function>;

  before() {

    this.serviceLocatorMock = Mock.ofType<Function>();

    const messageHandlingCollection = new MessageHandlingCollection([
      { message: GoodCommandForTest, handler: GoodCommandHandlerForTest },
      { message: EviCommandForTest, handler: EvilCommandHandlerForTest }
    ]);

    const functionExtractor = new FunctionConstructorMessageTypeExtractor();
    const serviceLocatorResolver = new ServiceLocatorAwareHandlerResolver(this.serviceLocatorMock.object);

    const classMapHandlerResolver = new ClassMapHandlerMapper(
      messageHandlingCollection,
      serviceLocatorResolver,
      functionExtractor
    );

    this.commandBus = new MessageBus([
      new MessageHandlerMiddleware(classMapHandlerResolver)
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


