
import { suite, test } from 'mocha-typescript';
import 'should';
import * as sinon from 'sinon';
import { SinonStub } from 'sinon';
import 'sinon-as-promised';
import * as Promise from 'bluebird';

import { MessageBusAllowMiddleware } from '../../../src/Bus/MessageBusAllowMiddleware';
import { PromiseDelegatesMessageHandlerMiddleware } from '../../../src/Handler/PromiseDelegatesMessageHandlerMiddleware';
import { ServiceLocatorAwareCallableResolver } from '../../../src/CallableResolver/ServiceLocatorAwareCallableResolver';
import { FunctionConstructorMessageTypeExtractor } from '../../../src/Extractor/FunctionConstructorMessageTypeExtractor';
import { PromiseGoodQueryHandlerForTest } from './utility/PromiseGoodQueryHandlerForTest';
import { GoodQueryForTest } from './utility/GoodQueryForTest';
import { ClassMapHandlerResolver } from '../../../src/Handler/Resolver/ClassMapHandlerResolver';
import { MessageHandlingCollection } from '../../../src/Collection/MessageHandlingCollection';
import { EvilQueryForTest } from './utility/EvilQueryForTest';
import { PromiseEvilQueryHandlerForTest } from './utility/PromiseEvilQueryHandlerForTest';
import { CustomError } from './utility/CustomError';

@suite class PromiseQueryBusIntegrationTest {

  commandBus: MessageBusAllowMiddleware;
  serviceLocatorMock: Function;

  before() {
    this.serviceLocatorMock = sinon.stub() as Function;

    let messageHandlingCollection = new MessageHandlingCollection([
      { message: GoodQueryForTest, handler: PromiseGoodQueryHandlerForTest },
      { message: EvilQueryForTest, handler: PromiseEvilQueryHandlerForTest }
    ]);

    let functionExtractor = new FunctionConstructorMessageTypeExtractor();
    let serviceLocatorResolver = new ServiceLocatorAwareCallableResolver(this.serviceLocatorMock);

    let classMapHandlerResolver = new ClassMapHandlerResolver(
      messageHandlingCollection,
      serviceLocatorResolver,
      functionExtractor
    );

    this.commandBus = new MessageBusAllowMiddleware([
      new PromiseDelegatesMessageHandlerMiddleware(classMapHandlerResolver)
    ]);
  }

  @test 'should execute the correct query handler and fulfill with result value'() {
    let command = new GoodQueryForTest();
    (this.serviceLocatorMock as SinonStub).withArgs(PromiseGoodQueryHandlerForTest).returns(new PromiseGoodQueryHandlerForTest());
    return this.commandBus.handle(command)
      .should.be.fulfilled()
      .then((result: any) => {
        result.should.be.eql('result-value');
      });
  }

  @test 'should execute the correct command handler and reject'() {
    let command = new EvilQueryForTest();
    (this.serviceLocatorMock as SinonStub).withArgs(PromiseEvilQueryHandlerForTest).returns(new PromiseEvilQueryHandlerForTest());
    return this.commandBus.handle(command)
      .should.be.rejected(CustomError);
  }
}


