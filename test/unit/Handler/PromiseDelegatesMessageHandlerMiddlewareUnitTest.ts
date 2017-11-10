
import { suite, test } from 'mocha-typescript';
import 'should';
import * as sinon from 'sinon';
import { SinonStub } from 'sinon';
import 'sinon-as-promised';
import * as Promise from 'bluebird';

import { PromiseDelegatesMessageHandlerMiddleware } from '../../../src/Handler/PromiseDelegatesMessageHandlerMiddleware';
import { MessageHandlerResolverInterface } from '../../../src/Handler/Resolver/MessageHandlerResolverInterface';

@suite class PromiseDelegatesMessageHandlerMiddlewareUnitTest {

  private delegatesToMessageHandlerMiddleware: PromiseDelegatesMessageHandlerMiddleware;

  private messageHandlerResolverMock: MessageHandlerResolverInterface;

  before() {
    this.messageHandlerResolverMock = <MessageHandlerResolverInterface>{
      getHandler: sinon.stub()
    };
    this.delegatesToMessageHandlerMiddleware = new PromiseDelegatesMessageHandlerMiddleware(this.messageHandlerResolverMock);
  }

  @test 'should resolve the handler'(done) {

    let message = 'message';
    let next = sinon.stub();

    let handler = sinon.stub();
    (this.messageHandlerResolverMock.getHandler as SinonStub).returns(handler);

    (handler.withArgs(message) as SinonStub).returns(Promise.resolve('handler-resolved'));
    (next.withArgs(message) as SinonStub).returns(Promise.resolve('next-resolved'));

    this.delegatesToMessageHandlerMiddleware.handle(message, next)
      .subscribe(() => {
        handler.calledWith(message).should.be.true();
        next.calledWith(message).should.be.true();
        done();
      });
  }

  @test 'should resolve the handler if not promise'(done) {

    let message = 'message';
    let next = sinon.stub();

    let handler = sinon.stub();
    (this.messageHandlerResolverMock.getHandler as SinonStub).returns(handler);

    (handler.withArgs(message) as SinonStub).returns('handler-resolved');
    (next.withArgs(message) as SinonStub).returns('next-resolved');

    this.delegatesToMessageHandlerMiddleware.handle(message, next)
      .subscribe(() => {
        handler.calledWith(message).should.be.true();
        next.calledWith(message).should.be.true();
        done();
      });
  }

  @test 'should resolve the handler and return the handle value'(done) {

    let message = 'message';
    let next = sinon.stub();

    let handler = sinon.stub();
    (this.messageHandlerResolverMock.getHandler as SinonStub).returns(handler);

    (handler.withArgs(message) as SinonStub).returns(Promise.resolve('handler-resolved'));
    (next.withArgs(message) as SinonStub).returns(Promise.resolve('next-resolved'));

    this.delegatesToMessageHandlerMiddleware.handle(message, next)
      .subscribe((result: any) => {
        result.should.be.eql('handler-resolved');

        handler.calledWith(message).should.be.true();
        next.calledWith(message).should.be.true();

        done();
      });
  }

  @test 'should resolve the handler and return the handle value if not promise'(done) {

    let message = 'message';
    let next = sinon.stub();

    let handler = sinon.stub();
    (this.messageHandlerResolverMock.getHandler as SinonStub).returns(handler);

    (handler.withArgs(message) as SinonStub).returns('handler-resolved');
    (next.withArgs(message) as SinonStub).returns('next-resolved');

    this.delegatesToMessageHandlerMiddleware.handle(message, next)
      .subscribe((result: any) => {
        result.should.be.eql('handler-resolved');

        handler.calledWith(message).should.be.true();
        next.calledWith(message).should.be.true();

        done();
      });
  }

  @test 'should rejected and don\'t catch the error if handler fails'(done) {

    let message = 'message';
    let next = sinon.stub();

    let handler = sinon.stub();
    (this.messageHandlerResolverMock.getHandler as SinonStub).returns(handler);

    (handler.withArgs(message) as SinonStub).returns(Promise.reject(new Error('handler-rejected')));
    (next.withArgs(message) as SinonStub).returns(Promise.resolve('next-resolved'));

    this.delegatesToMessageHandlerMiddleware.handle(message, next)
      .subscribe(
        () => { throw new Error('it-should-be-never-called'); },
        () => {
          handler.calledWith(message).should.be.true();
          next.calledWith(message).should.be.false();

          done();
        }
      );
  }

}
