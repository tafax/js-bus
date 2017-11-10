
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
import { PromiseGoodCommandHandlerForTest } from './utility/PromiseGoodCommandHandlerForTest';
import { GoodCommandForTest } from './utility/GoodCommandForTest';
import { ClassMapHandlerResolver } from '../../../src/Handler/Resolver/ClassMapHandlerResolver';
import { MessageHandlingCollection } from '../../../src/Collection/MessageHandlingCollection';
import { EvilCommandForTest } from './utility/EvilCommandForTest';
import { PromiseEvilCommandHandlerForTest } from './utility/PromiseEvilCommandHandlerForTest';
import { CustomError } from './utility/CustomError';

@suite class PromiseCommandBusIntegrationTest {

  commandBus: MessageBusAllowMiddleware;
  serviceLocatorMock: Function;

  before() {
    this.serviceLocatorMock = sinon.stub() as Function;

    let messageHandlingCollection = new MessageHandlingCollection([
      { message: GoodCommandForTest, handler: PromiseGoodCommandHandlerForTest },
      { message: EvilCommandForTest, handler: PromiseEvilCommandHandlerForTest }
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

  @test 'should execute the correct command handler and fulfill'(done) {
    let command = new GoodCommandForTest();
    (this.serviceLocatorMock as SinonStub).withArgs(PromiseGoodCommandHandlerForTest).returns(new PromiseGoodCommandHandlerForTest());
    return this.commandBus.handle(command)
      .subscribe(
        () => { done(); }
      );
  }

  @test 'should execute the correct command handler and reject'(done) {
    let command = new EvilCommandForTest();
    (this.serviceLocatorMock as SinonStub).withArgs(PromiseEvilCommandHandlerForTest).returns(new PromiseEvilCommandHandlerForTest());
    this.commandBus.handle(command)
      .subscribe(
        () => { throw new Error('it-should-be-never-called'); },
        (error: CustomError) => {
          error.should.be.instanceof(CustomError);
          done();
        }
      );
  }
}


