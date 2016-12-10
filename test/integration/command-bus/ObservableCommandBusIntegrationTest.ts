
import { suite, test } from 'mocha-typescript';
import 'should';
import * as sinon from 'sinon';
import { SinonStub } from 'sinon';
import 'sinon-as-promised';

import { MessageBusAllowMiddleware } from '../../../src/Bus/MessageBusAllowMiddleware';
import { ObservableDelegatesMessageHandlerMiddleware } from '../../../src/Handler/ObservableDelegatesMessageHandlerMiddleware';
import { ServiceLocatorAwareCallableResolver } from '../../../src/CallableResolver/ServiceLocatorAwareCallableResolver';
import { FunctionConstructorMessageTypeExtractor } from '../../../src/Extractor/FunctionConstructorMessageTypeExtractor';
import { ObservableGoodCommandHandlerForTest } from './utility/ObservableGoodCommandHandlerForTest';
import { GoodCommandForTest } from './utility/GoodCommandForTest';
import { ClassMapHandlerResolver } from '../../../src/Handler/Resolver/ClassMapHandlerResolver';
import { MessageHandlingCollection } from '../../../src/Collection/MessageHandlingCollection';
import { EvilCommandForTest } from './utility/EvilCommandForTest';
import { ObservableEvilCommandHandlerForTest } from './utility/ObservableEvilCommandHandlerForTest';
import { CustomError } from './utility/CustomError';

@suite class ObservableCommandBusIntegrationTest {

  commandBus: MessageBusAllowMiddleware;
  serviceLocatorMock: Function;

  before() {
    this.serviceLocatorMock = sinon.stub() as Function;

    let messageHandlingCollection = new MessageHandlingCollection([
      { message: GoodCommandForTest, handler: ObservableGoodCommandHandlerForTest },
      { message: EvilCommandForTest, handler: ObservableEvilCommandHandlerForTest }
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

  @test 'should execute the correct command handler and fulfill'() {
    let command = new GoodCommandForTest();
    (this.serviceLocatorMock as SinonStub).withArgs(ObservableGoodCommandHandlerForTest).returns(new ObservableGoodCommandHandlerForTest());
    return this.commandBus.handle(command)
      .subscribe(
        () => {},
        () => { throw new Error('should-not-be-called'); }
      );
  }

  @test 'should execute the correct command handler and reject'() {
    let command = new EvilCommandForTest();
    (this.serviceLocatorMock as SinonStub).withArgs(ObservableEvilCommandHandlerForTest).returns(new ObservableEvilCommandHandlerForTest());
    return this.commandBus.handle(command)
      .subscribe(
        () => { throw new Error('should-not-be-called'); },
        (error: any) => { error.should.be.instanceof(CustomError); }
      );
  }
}


