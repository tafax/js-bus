
import { suite, test, Mock, IMock, Times } from '@js-bus/test';
import { MessageBusAllowMiddleware } from '../../../src/lib/bus/message-bus-allow-middleware';
import { ServiceLocatorAwareCallableResolver } from '../../../src/lib/callable-resolver/service-locator-aware.callable-resolver';
import { MessageHandlingCollection } from '../../../src/lib/collection/message-handling.collection';
import { FunctionConstructorMessageTypeExtractor } from '../../../src/lib/extractor/function-constructor.message-type-extractor';
import { ObservableDelegatesMessageHandlerMiddleware } from '../../../src/lib/handler/observable-delegates-message-handler.middleware';
import { ClassMapHandlerResolver } from '../../../src/lib/resolver/class-map.handler-resolver';

import { GoodQueryHandlerForTest } from './utility/good-query-handler-for-test';
import { GoodQueryForTest } from './utility/good-query-for-test';
import { EvilQueryForTest } from './utility/evil-query-for-test';
import { EvilQueryHandlerForTest } from './utility/evil-query-handler-for-test';
import { CustomError } from './utility/custom.error';

@suite class QueryBusIntegrationTests {

  private queryBus: MessageBusAllowMiddleware;
  private serviceLocatorMock: IMock<Function>;

  before() {
    this.serviceLocatorMock = Mock.ofType<Function>();

    const messageHandlingCollection = new MessageHandlingCollection([
      { message: GoodQueryForTest, handler: GoodQueryHandlerForTest },
      { message: EvilQueryForTest, handler: EvilQueryHandlerForTest }
    ]);

    const functionExtractor = new FunctionConstructorMessageTypeExtractor();
    const serviceLocatorResolver = new ServiceLocatorAwareCallableResolver(this.serviceLocatorMock.object);

    const classMapHandlerResolver = new ClassMapHandlerResolver(
      messageHandlingCollection,
      serviceLocatorResolver,
      functionExtractor
    );

    this.queryBus = new MessageBusAllowMiddleware([
      new ObservableDelegatesMessageHandlerMiddleware(classMapHandlerResolver)
    ]);
  }

  @test 'should execute the correct query handler and fulfill with result value'() {

    const command = new GoodQueryForTest();

    this.serviceLocatorMock
      .setup(x => x(GoodQueryHandlerForTest))
      .returns(() => new GoodQueryHandlerForTest())
      .verifiable(Times.once());

    return this.queryBus.handle(command)
      .subscribe(
        (result: any) => { result.should.be.eql('result-value'); },
        () => { throw new Error('should-not-be-called'); }
      );
  }

  @test 'should execute the correct command handler and reject'() {

    const command = new EvilQueryForTest();

    this.serviceLocatorMock
      .setup(x => x(EvilQueryHandlerForTest))
      .returns(() => new EvilQueryHandlerForTest())
      .verifiable(Times.once());

    return this.queryBus.handle(command)
      .subscribe(
        () => { throw new Error('should-not-be-called'); },
        (error: Error) => { error.should.be.instanceof(CustomError); }
      );
  }
}


