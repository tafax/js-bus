
import { suite, test, only } from 'mocha-typescript';
import 'should';
import * as sinon from 'sinon';
import { SinonStub } from 'sinon';
import 'sinon-as-promised';
import { Observable } from 'rxjs';
import * as Bluebird from 'bluebird';

import { ObservableDelegatesMessageHandlerMiddleware } from '../../../src/Handler/ObservableDelegatesMessageHandlerMiddleware';
import { MessageHandlerResolverInterface } from '../../../src/Handler/Resolver/MessageHandlerResolverInterface';

@suite class ObservablesDelegatesMessageHandlerMiddlewareUnitTest {

  private delegatesToMessageHandlerMiddleware: ObservableDelegatesMessageHandlerMiddleware;

  private messageHandlerResolverMock: MessageHandlerResolverInterface;

  before() {
    this.messageHandlerResolverMock = <MessageHandlerResolverInterface>{
      getHandler: sinon.stub()
    };
    this.delegatesToMessageHandlerMiddleware = new ObservableDelegatesMessageHandlerMiddleware(this.messageHandlerResolverMock);
  }

  @test 'should resolve the handler if observables'() {

    let message = 'message';
    let next = sinon.stub();

    let handler = sinon.stub();
    (this.messageHandlerResolverMock.getHandler as SinonStub).returns(handler);

    (handler.withArgs(message) as SinonStub).returns(Observable.of('handler-resolved'));
    (next.withArgs(message) as SinonStub).returns(Observable.of('next-resolved'));

    return (this.delegatesToMessageHandlerMiddleware.handle(message, next) as Observable<any>)
      .subscribe(() => {
        handler.calledWith(message).should.be.true();
        next.calledWith(message).should.be.true();
      });
  }

  @test 'should resolve the handler if not observables'() {

    let message = 'message';
    let next = sinon.stub();

    let handler = sinon.stub();
    (this.messageHandlerResolverMock.getHandler as SinonStub).returns(handler);

    (handler.withArgs(message) as SinonStub).returns('handler-resolved');
    (next.withArgs(message) as SinonStub).returns('next-resolved');

    return (this.delegatesToMessageHandlerMiddleware.handle(message, next) as Observable<any>)
      .subscribe(() => {
        handler.calledWith(message).should.be.true();
        next.calledWith(message).should.be.true();
      });
  }

  @test 'should resolve the handler if promise'() {

    let message = 'message';
    let next = sinon.stub();

    let handler = sinon.stub();
    (this.messageHandlerResolverMock.getHandler as SinonStub).returns(handler);

    (handler.withArgs(message) as SinonStub).returns(Promise.resolve('handler-resolved'));
    (next.withArgs(message) as SinonStub).returns(Promise.resolve('next-resolved'));

    return (this.delegatesToMessageHandlerMiddleware.handle(message, next) as Observable<any>)
      .subscribe(() => {
        handler.calledWith(message).should.be.true();
        next.calledWith(message).should.be.true();
      });
  }

  @test 'should resolve the handler if Bluebird promise'() {

    let message = 'message';
    let next = sinon.stub();

    let handler = sinon.stub();
    (this.messageHandlerResolverMock.getHandler as SinonStub).returns(handler);

    (handler.withArgs(message) as SinonStub).returns(Bluebird.resolve('handler-resolved'));
    (next.withArgs(message) as SinonStub).returns(Bluebird.resolve('next-resolved'));

    return (this.delegatesToMessageHandlerMiddleware.handle(message, next) as Observable<any>)
      .subscribe(() => {
        handler.calledWith(message).should.be.true();
        next.calledWith(message).should.be.true();
      });
  }

  @test 'should resolve the handler and return the handle value'() {

    let message = 'message';
    let next = sinon.stub();

    let handler = sinon.stub();
    (this.messageHandlerResolverMock.getHandler as SinonStub).returns(handler);

    (handler.withArgs(message) as SinonStub).returns(Observable.of('handler-resolved'));
    (next.withArgs(message) as SinonStub).returns(Observable.of('next-resolved'));

    return (this.delegatesToMessageHandlerMiddleware.handle(message, next) as Observable<any>)
      .subscribe((result: any) => {
        result.should.be.eql('handler-resolved');

        handler.calledWith(message).should.be.true();
        next.calledWith(message).should.be.true();
      });
  }

  @test 'should resolve the handler if not observable and return the handle value'() {

    let message = 'message';
    let next = sinon.stub();

    let handler = sinon.stub();
    (this.messageHandlerResolverMock.getHandler as SinonStub).returns(handler);

    (handler.withArgs(message) as SinonStub).returns('handler-resolved');
    (next.withArgs(message) as SinonStub).returns('next-resolved');

    return (this.delegatesToMessageHandlerMiddleware.handle(message, next) as Observable<any>)
      .subscribe((result: any) => {
        result.should.be.eql('handler-resolved');

        handler.calledWith(message).should.be.true();
        next.calledWith(message).should.be.true();
      });
  }

  @test 'should resolve the handler if promise and return the handle value'() {

    let message = 'message';
    let next = sinon.stub();

    let handler = sinon.stub();
    (this.messageHandlerResolverMock.getHandler as SinonStub).returns(handler);

    (handler.withArgs(message) as SinonStub).returns(Promise.resolve('handler-resolved'));
    (next.withArgs(message) as SinonStub).returns(Promise.resolve('handler-resolved'));

    return (this.delegatesToMessageHandlerMiddleware.handle(message, next) as Observable<any>)
      .subscribe((result: any) => {
        result.should.be.eql('handler-resolved');

        handler.calledWith(message).should.be.true();
        next.calledWith(message).should.be.true();
      });
  }

  @test 'should resolve the handler if Bluebird promise and return the handle value'() {

    let message = 'message';
    let next = sinon.stub();

    let handler = sinon.stub();
    (this.messageHandlerResolverMock.getHandler as SinonStub).returns(handler);

    (handler.withArgs(message) as SinonStub).returns(Bluebird.resolve('handler-resolved'));
    (next.withArgs(message) as SinonStub).returns(Bluebird.resolve('handler-resolved'));

    return (this.delegatesToMessageHandlerMiddleware.handle(message, next) as Observable<any>)
      .subscribe((result: any) => {
        result.should.be.eql('handler-resolved');

        handler.calledWith(message).should.be.true();
        next.calledWith(message).should.be.true();
      });
  }

  @test 'should rejected and don\'t catch the error if handler fails'() {

    let message = 'message';
    let next = sinon.stub();

    let handler = sinon.stub();
    (this.messageHandlerResolverMock.getHandler as SinonStub).returns(handler);

    (handler.withArgs(message) as SinonStub).throws(new Error('handler-rejected'));
    (next.withArgs(message) as SinonStub).returns('next-resolved');

    return (this.delegatesToMessageHandlerMiddleware.handle(message, next) as Observable<any>)
      .subscribe(
        () => {
          throw new Error('It should not be called');
        },
        () => {
          handler.calledWith(message).should.be.true();
          next.calledWith(message).should.be.false();
        }
      );
  }

}
