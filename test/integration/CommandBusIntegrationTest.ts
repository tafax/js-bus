

import { suite, test } from 'mocha-typescript';
import 'should';
import * as sinon from 'sinon';
import { SinonStub } from 'sinon';
import 'sinon-as-promised';
import * as Promise from 'bluebird';

import { MessageBusAllowMiddleware } from '../../src/Bus/MessageBusAllowMiddleware';
import { MessageBusPromiseMiddleware } from '../../src/Middleware/MessageBusPromiseMiddleware';
import { DelegatesToMessageHandlerMiddleware } from '../../src/Handler/DelegatesToMessageHandlerMiddleware';
import { DecoratorMessageHandlerResolver } from '../../src/Handler/Resolver/DecoratorMessageHandlerResolver';
import { MetadataCallableResolver } from '../../src/Handler/Metadata/MetadataCallableResolver';
import { ServiceLocatorAwareCallableResolver } from '../../src/CallableResolver/ServiceLocatorAwareCallableResolver';
import { FunctionConstructorMessageTypeExtractor } from '../../src/Extractor/FunctionConstructorMessageTypeExtractor';
import { CommandHandlerForTest } from './utility/CommandHandlerForTest';
import { CommandForTest } from './utility/CommandForTest';

@suite class CommandBusIntegrationTest {

  commandBus: MessageBusAllowMiddleware;
  serviceLocatorMock: Function;

  before() {
    this.serviceLocatorMock = sinon.stub() as Function;

    let metadataCallableResolver = new MetadataCallableResolver(
      new ServiceLocatorAwareCallableResolver(this.serviceLocatorMock)
    );

    this.commandBus = new MessageBusAllowMiddleware([
      new MessageBusPromiseMiddleware(),
      new DelegatesToMessageHandlerMiddleware(new DecoratorMessageHandlerResolver(
        new FunctionConstructorMessageTypeExtractor(),
        metadataCallableResolver
      ))
    ]);
  }

  @test 'should execute the correct command handler'() {
    let command = new CommandForTest();
    (this.serviceLocatorMock as SinonStub).withArgs(CommandHandlerForTest).returns(new CommandHandlerForTest());
    return this.commandBus.handle(command)
      .should.be.fulfilled();
  }
}


