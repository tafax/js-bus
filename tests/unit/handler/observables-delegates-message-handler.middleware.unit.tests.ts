
import { suite, test, IMock, Mock, Times } from '@js-bus/test';
import { of } from 'rxjs';
import { ObservableDelegatesMessageHandlerMiddleware } from '../../../src/lib/handler/observable-delegates-message-handler.middleware';
import { MessageHandlerResolverInterface } from '../../../src/lib/resolver/message-handler-resolver.interface';

@suite class ObservablesDelegatesMessageHandlerMiddlewareUnitTests {

  private delegatesToMessageHandlerMiddleware: ObservableDelegatesMessageHandlerMiddleware;
  private messageHandlerResolverMock: IMock<MessageHandlerResolverInterface>;

  before() {

    this.messageHandlerResolverMock = Mock.ofType<MessageHandlerResolverInterface>();

    this.delegatesToMessageHandlerMiddleware = new ObservableDelegatesMessageHandlerMiddleware(
      this.messageHandlerResolverMock.object
    );
  }

  @test 'should resolve the handler if observables'() {

    const message = 'message';

    const nextMock = Mock.ofType(Function);
    nextMock
      .setup(x => x(message))
      .returns(() => of('next-resolved'))
      .verifiable(Times.once());

    const handlerMock = Mock.ofType(Function);
    handlerMock
      .setup(x => x(message))
      .returns(() => of('handler-resolved'))
      .verifiable(Times.once());

    this.messageHandlerResolverMock
      .setup(x => x.getHandler(message))
      .returns(() => handlerMock.object)
      .verifiable(Times.once());

    return this.delegatesToMessageHandlerMiddleware.handle(message, <any>nextMock.object)
      .subscribe((result: string) => {

        result.should.be.eql('handler-resolved');

        handlerMock.verifyAll();
        nextMock.verifyAll();
      });
  }

  @test 'should resolve the handler if not observables'() {

    const message = 'message';

    const nextMock = Mock.ofType(Function);
    nextMock
      .setup(x => x(message))
      .returns(() => of('next-resolved'))
      .verifiable(Times.once());

    const handlerMock = Mock.ofType(Function);
    handlerMock
      .setup(x => x(message))
      .returns(() => 'handler-resolved')
      .verifiable(Times.once());

    this.messageHandlerResolverMock
      .setup(x => x.getHandler(message))
      .returns(() => handlerMock.object)
      .verifiable(Times.once());

    return this.delegatesToMessageHandlerMiddleware.handle(message, <any>nextMock.object)
      .subscribe(() => {
        handlerMock.verifyAll();
        nextMock.verifyAll();
      });
  }

  @test 'should resolve the handler if promise'() {

    const message = 'message';

    const nextMock = Mock.ofType(Function);
    nextMock
      .setup(x => x(message))
      .returns(() => of('next-resolved'))
      .verifiable(Times.once());

    const handlerMock = Mock.ofType(Function);
    handlerMock
      .setup(x => x(message))
      .returns(() => Promise.resolve('handler-resolved'))
      .verifiable(Times.once());

    this.messageHandlerResolverMock
      .setup(x => x.getHandler(message))
      .returns(() => handlerMock.object)
      .verifiable(Times.once());

    return this.delegatesToMessageHandlerMiddleware.handle(message, <any>nextMock.object)
      .subscribe(() => {
        handlerMock.verifyAll();
        nextMock.verifyAll();
      });
  }

  @test 'should resolve the handler if not observable and return the handle value'() {

    const message = 'message';

    const nextMock = Mock.ofType(Function);
    nextMock
      .setup(x => x(message))
      .returns(() => of('next-resolved'))
      .verifiable(Times.once());

    const handlerMock = Mock.ofType(Function);
    handlerMock
      .setup(x => x(message))
      .returns(() => 'handler-resolved')
      .verifiable(Times.once());

    this.messageHandlerResolverMock
      .setup(x => x.getHandler(message))
      .returns(() => handlerMock.object)
      .verifiable(Times.once());

    return this.delegatesToMessageHandlerMiddleware.handle(message, <any>nextMock.object)
      .subscribe((result: any) => {

        result.should.be.eql('handler-resolved');

        handlerMock.verifyAll();
        nextMock.verifyAll();
      });
  }

  @test 'should rejected and don\'t catch the error if handler fails'() {

    const message = 'message';

    const nextMock = Mock.ofType(Function);
    nextMock
      .setup(x => x(message))
      .returns(() => of('next-resolved'))
      .verifiable(Times.never());

    const handlerMock = Mock.ofType(Function);
    handlerMock
      .setup(x => x(message))
      .throws(new Error('handler-error'))
      .verifiable(Times.once());

    this.messageHandlerResolverMock
      .setup(x => x.getHandler(message))
      .returns(() => handlerMock.object)
      .verifiable(Times.once());

    return this.delegatesToMessageHandlerMiddleware.handle(message, <any>nextMock.object)
      .subscribe(
          () => { throw new Error('it-should-be-never-called'); },
          (error: Error) => {

            error.message.should.be.eql('handler-error');

            handlerMock.verifyAll();
            nextMock.verifyAll();
          }
        );
  }

}
