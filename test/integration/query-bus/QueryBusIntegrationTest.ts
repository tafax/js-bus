
import { suite, test } from 'mocha-typescript';
import 'should';
import * as sinon from 'sinon';
import { SinonStub } from 'sinon';
import 'sinon-as-promised';
import * as Promise from 'bluebird';

import { MessageBusAllowMiddleware } from '../../../src/Bus/MessageBusAllowMiddleware';
import { MessageBusPromiseMiddleware } from '../../../src/Middleware/MessageBusPromiseMiddleware';
import { DelegatesToMessageHandlerMiddleware } from '../../../src/Handler/DelegatesToMessageHandlerMiddleware';
import { ServiceLocatorAwareCallableResolver } from '../../../src/CallableResolver/ServiceLocatorAwareCallableResolver';
import { FunctionConstructorMessageTypeExtractor } from '../../../src/Extractor/FunctionConstructorMessageTypeExtractor';
import { GoodQueryHandlerForTest } from './utility/GoodQueryHandlerForTest';
import { GoodQueryForTest } from './utility/GoodQueryForTest';
import { ClassMapHandlerResolver } from '../../../src/Handler/Resolver/ClassMapHandlerResolver';
import { MessageHandlingCollection } from '../../../src/Collection/MessageHandlingCollection';
import { EvilQueryForTest } from './utility/EvilQueryForTest';
import { EvilQueryHandlerForTest } from './utility/EvilQueryHandlerForTest';
import { CustomError } from './utility/CustomError';

@suite class QueryBusIntegrationTest {

  commandBus: MessageBusAllowMiddleware;
  serviceLocatorMock: Function;

  before() {
    this.serviceLocatorMock = sinon.stub() as Function;

    let messageHandlingCollection = new MessageHandlingCollection([
      { message: GoodQueryForTest, handler: GoodQueryHandlerForTest }
    ]);

    let functionExtractor = new FunctionConstructorMessageTypeExtractor();
    let serviceLocatorResolver = new ServiceLocatorAwareCallableResolver(this.serviceLocatorMock);

    let classMapHandlerResolver = new ClassMapHandlerResolver(
      messageHandlingCollection,
      serviceLocatorResolver,
      functionExtractor
    );

    this.commandBus = new MessageBusAllowMiddleware([
      new MessageBusPromiseMiddleware(),
      new DelegatesToMessageHandlerMiddleware(classMapHandlerResolver)
    ]);
  }

  @test 'should execute the correct query handler and fulfill with result value'() {
    let command = new GoodQueryForTest();
    (this.serviceLocatorMock as SinonStub).withArgs(GoodQueryHandlerForTest).returns(new GoodQueryHandlerForTest());
    return this.commandBus.handle(command)
      .should.be.fulfilled()
      .then((result: any) => {
        result.should.be.eql('result-value');
      });
  }

  @test 'should execute the correct command handler and reject'() {
    let command = new EvilQueryForTest();
    (this.serviceLocatorMock as SinonStub).withArgs(EvilQueryHandlerForTest).returns(new EvilQueryHandlerForTest());
    return this.commandBus.handle(command)
      .should.be.rejected(CustomError);
  }
}


