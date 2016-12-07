

import { suite, test } from 'mocha-typescript';
import 'should';
import * as sinon from 'sinon';
import { SinonStub } from 'sinon';
import 'sinon-as-promised';
import * as Promise from 'bluebird';

import { MessageBusAllowMiddleware } from '../../src/Bus/MessageBusAllowMiddleware';
import { MessageBusPromiseMiddleware } from '../../src/Middleware/MessageBusPromiseMiddleware';
import { DelegatesToMessageHandlerMiddleware } from '../../src/Handler/DelegatesToMessageHandlerMiddleware';
import { ServiceLocatorAwareCallableResolver } from '../../src/CallableResolver/ServiceLocatorAwareCallableResolver';
import { FunctionConstructorMessageTypeExtractor } from '../../src/Extractor/FunctionConstructorMessageTypeExtractor';
import { GoodCommandHandlerForTest } from './utility/GoodCommandHandlerForTest';
import { GoodCommandForTest } from './utility/GoodCommandForTest';
import { ClassMapHandlerResolver } from '../../src/Handler/Resolver/ClassMapHandlerResolver';
import { MessageHandlingCollection } from '../../src/Collection/MessageHandlingCollection';
import { EvilCommandForTest } from './utility/EvilCommandForTest';
import { EvilCommandHandlerForTest } from './utility/EvilCommandHandlerForTest';
import { CustomError } from './utility/CustomError';

@suite class CommandBusIntegrationTest {

  commandBus: MessageBusAllowMiddleware;
  serviceLocatorMock: Function;

  before() {
    this.serviceLocatorMock = sinon.stub() as Function;

    let messageHandlingCollection = new MessageHandlingCollection([
      { message: GoodCommandForTest, handler: GoodCommandHandlerForTest }
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

  @test 'should execute the correct command handler and fulfill'() {
    let command = new GoodCommandForTest();
    (this.serviceLocatorMock as SinonStub).withArgs(GoodCommandHandlerForTest).returns(new GoodCommandHandlerForTest());
    return this.commandBus.handle(command)
      .should.be.fulfilled();
  }

  @test 'should execute the correct command handler and reject'() {
    let command = new EvilCommandForTest();
    (this.serviceLocatorMock as SinonStub).withArgs(EvilCommandHandlerForTest).returns(new EvilCommandHandlerForTest());
    return this.commandBus.handle(command)
      .should.be.rejected(CustomError);
  }
}


