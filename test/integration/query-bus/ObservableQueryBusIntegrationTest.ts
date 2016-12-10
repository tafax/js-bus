
import { suite, test } from 'mocha-typescript';
import 'should';
import * as sinon from 'sinon';
import { SinonStub } from 'sinon';
import 'sinon-as-promised';
import * as Promise from 'bluebird';

import { MessageBusAllowMiddleware } from '../../../src/Bus/MessageBusAllowMiddleware';
import { ObservableDelegatesMessageHandlerMiddleware } from '../../../src/Handler/ObservableDelegatesMessageHandlerMiddleware';
import { ServiceLocatorAwareCallableResolver } from '../../../src/CallableResolver/ServiceLocatorAwareCallableResolver';
import { FunctionConstructorMessageTypeExtractor } from '../../../src/Extractor/FunctionConstructorMessageTypeExtractor';
import { ObservableGoodQueryHandlerForTest } from './utility/ObservableGoodQueryHandlerForTest';
import { GoodQueryForTest } from './utility/GoodQueryForTest';
import { ClassMapHandlerResolver } from '../../../src/Handler/Resolver/ClassMapHandlerResolver';
import { MessageHandlingCollection } from '../../../src/Collection/MessageHandlingCollection';
import { EvilQueryForTest } from './utility/EvilQueryForTest';
import { ObservableEvilQueryHandlerForTest } from './utility/ObservableEvilQueryHandlerForTest';
import { CustomError } from './utility/CustomError';

@suite class ObservableQueryBusIntegrationTest {

  commandBus: MessageBusAllowMiddleware;
  serviceLocatorMock: Function;

  before() {
    this.serviceLocatorMock = sinon.stub() as Function;

    let messageHandlingCollection = new MessageHandlingCollection([
      { message: GoodQueryForTest, handler: ObservableGoodQueryHandlerForTest },
      { message: EvilQueryForTest, handler: ObservableEvilQueryHandlerForTest }
    ]);

    let functionExtractor = new FunctionConstructorMessageTypeExtractor();
    let serviceLocatorResolver = new ServiceLocatorAwareCallableResolver(this.serviceLocatorMock);

    let classMapHandlerResolver = new ClassMapHandlerResolver(
      messageHandlingCollection,
      serviceLocatorResolver,
      functionExtractor
    );

    this.commandBus = new MessageBusAllowMiddleware([
      new ObservableDelegatesMessageHandlerMiddleware(classMapHandlerResolver)
    ]);
  }

  @test 'should execute the correct query handler and fulfill with result value'() {
    let command = new GoodQueryForTest();
    (this.serviceLocatorMock as SinonStub).withArgs(ObservableGoodQueryHandlerForTest).returns(new ObservableGoodQueryHandlerForTest());
    return this.commandBus.handle(command)
      .subscribe(
        (result: any) => { result.should.be.eql('result-value'); },
        () => { throw new Error('should-not-be-called'); }
      );
  }

  @test 'should execute the correct command handler and reject'() {
    let command = new EvilQueryForTest();
    (this.serviceLocatorMock as SinonStub).withArgs(ObservableEvilQueryHandlerForTest).returns(new ObservableEvilQueryHandlerForTest());
    return this.commandBus.handle(command)
      .subscribe(
        () => { throw new Error('should-not-be-called'); },
        (error: any) => { error.should.be.instanceof(CustomError); }
      );
  }
}


