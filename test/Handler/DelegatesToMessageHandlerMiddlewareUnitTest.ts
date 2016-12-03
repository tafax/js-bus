
import { suite, test } from 'mocha-typescript';
import 'should';
import * as sinon from 'sinon';
import { SinonStub } from 'sinon';
import 'sinon-as-promised';
import * as Promise from 'bluebird';

import { DelegatesToMessageHandlerMiddleware } from '../../src/Handler/DelegatesToMessageHandlerMiddleware';
import { MessageHandlerResolverInterface } from '../../src/Handler/Resolver/MessageHandlerResolverInterface';

@suite class DelegatesToMessageHandlerMiddlewareUnitTest {

  private delegatesToMessageHandlerMiddleware: DelegatesToMessageHandlerMiddleware;

  private messageHandlerResolverMock: MessageHandlerResolverInterface;

  before() {
    this.messageHandlerResolverMock = <MessageHandlerResolverInterface>{
      getHandler: sinon.stub()
    };
    this.delegatesToMessageHandlerMiddleware = new DelegatesToMessageHandlerMiddleware(this.messageHandlerResolverMock);
  }

  @test 'should resolve the handler'() {

    let message = 'message';
    let next = sinon.stub();

    let handler = sinon.stub();
    (this.messageHandlerResolverMock.getHandler as SinonStub).returns(handler);

    (handler.withArgs(message) as SinonStub).resolves('handler-resolved');
    (next.withArgs(message) as SinonStub).resolves('next-resolved');

    return this.delegatesToMessageHandlerMiddleware.handle(message, next)
      .should.be.fulfilled()
      .then(() => {
        handler.calledWith(message).should.be.true();
        next.calledWith(message).should.be.true();
      });
  }

  @test 'should rejected and don\'t catch the error if handler fails'() {

    let message = 'message';
    let next = sinon.stub();

    let handler = sinon.stub();
    (this.messageHandlerResolverMock.getHandler as SinonStub).returns(handler);

    (handler.withArgs(message) as SinonStub).rejects(new Error('handler-rejected'));
    (next.withArgs(message) as SinonStub).resolves('next-resolved');

    return this.delegatesToMessageHandlerMiddleware.handle(message, next)
      .should.be.rejected(Error)
      .then(() => {
        handler.calledWith(message).should.be.true();
        next.calledWith(message).should.be.false();
      });
  }

}
