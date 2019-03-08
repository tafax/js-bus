
import { suite, test, Mock, IMock, Times } from '@js-bus/test';
import { of } from 'rxjs';
import { MessageBusAllowMiddleware } from '../../../src/lib/bus/message-bus-allow-middleware';
import { ServiceLocatorAwareCallableResolver } from '../../../src/lib/callable-resolver/service-locator-aware.callable-resolver';
import { MessageHandlingCollection } from '../../../src/lib/collection/message-handling.collection';
import { FunctionConstructorMessageTypeExtractor } from '../../../src/lib/extractor/function-constructor.message-type-extractor';
import { ObservableDelegatesMessageHandlerMiddleware } from '../../../src/lib/handler/observable-delegates-message-handler.middleware';
import { ClassMapHandlerResolver } from '../../../src/lib/resolver/class-map.handler-resolver';
import { CustomError } from '../../fixtures/custom.error';
import { EvilQueryForTest } from '../../fixtures/evil-query-for-test';
import { EvilQueryHandlerForTest } from '../../fixtures/evil-query-handler-for-test';
import { GoodQueryForTest } from '../../fixtures/good-query-for-test';
import { GoodQueryHandlerForTest } from '../../fixtures/good-query-handler-for-test';

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

  @test 'should execute the correct query handler and return the result value'() {

    const query = new GoodQueryForTest();

    this.serviceLocatorMock
      .setup(x => x(GoodQueryHandlerForTest))
      .returns(() => new GoodQueryHandlerForTest())
      .verifiable(Times.once());

    return this.queryBus.handle(query)
      .subscribe(
        (result: string) => {
          result.should.be.eql('result-value');

          this.serviceLocatorMock.verifyAll();
        },
      );
  }

  @test 'should execute the correct query handler and return the result value without subscribing'() {

    const query = new GoodQueryForTest();

    const queryHandlerMock = Mock.ofType(GoodQueryHandlerForTest);

    queryHandlerMock
      .setup(x => x.handle(query))
      .returns(() => of('result-value'))
      .verifiable(Times.once());

    this.serviceLocatorMock
      .setup(x => x(GoodQueryHandlerForTest))
      .returns(() => queryHandlerMock.object)
      .verifiable(Times.once());

    const execution$ = this.queryBus.handle(query);

    this.serviceLocatorMock.verifyAll();
    queryHandlerMock.verifyAll();

    return execution$
      .subscribe((result: string) => {
        result.should.be.eql('result-value');

        this.serviceLocatorMock.verifyAll();
        queryHandlerMock.verifyAll();
      });
  }

  @test 'should execute the correct command handler and reject'() {

    const query = new EvilQueryForTest();

    this.serviceLocatorMock
      .setup(x => x(EvilQueryHandlerForTest))
      .returns(() => new EvilQueryHandlerForTest())
      .verifiable(Times.once());

    return this.queryBus.handle(query)
      .subscribe(
        () => { throw new Error('should-not-be-called'); },
        (error: Error) => {
          error.should.be.instanceof(CustomError);

          this.serviceLocatorMock.verifyAll();
        }
      );
  }
}


