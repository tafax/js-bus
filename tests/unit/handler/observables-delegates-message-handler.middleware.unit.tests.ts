
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

  @test 'should resolve the handlers if observables'() {

    const message = 'message';

    const nextMock = Mock.ofType(Function);
    nextMock
      .setup(x => x(message))
      .returns(() => of('next-resolved'))
      .verifiable(Times.once());

    const handlerMock1 = Mock.ofType(Function);
    handlerMock1
      .setup(x => x(message))
      .returns(() => of('handler1-resolved'))
      .verifiable(Times.once());

    const handlerMock2 = Mock.ofType(Function);
    handlerMock2
      .setup(x => x(message))
      .returns(() => of('handler2-resolved'))
      .verifiable(Times.once());

    this.messageHandlerResolverMock
      .setup(x => x.getHandlers(message))
      .returns(() => [ handlerMock1.object, handlerMock2.object ])
      .verifiable(Times.once());

    return this.delegatesToMessageHandlerMiddleware.handle(message, <any>nextMock.object)
      .subscribe((result: string) => {

        result.should.be.eql([ 'handler1-resolved', 'handler2-resolved' ]);

        handlerMock1.verifyAll();
        handlerMock2.verifyAll();
        nextMock.verifyAll();
      });
  }

  @test 'should resolve the handlers if not observables'() {

    const message = 'message';

    const nextMock = Mock.ofType(Function);
    nextMock
      .setup(x => x(message))
      .returns(() => of('next-resolved'))
      .verifiable(Times.once());

    const handlerMock1 = Mock.ofType(Function);
    handlerMock1
      .setup(x => x(message))
      .returns(() => 'handler1-resolved')
      .verifiable(Times.once());

    const handlerMock2 = Mock.ofType(Function);
    handlerMock2
      .setup(x => x(message))
      .returns(() => of('handler2-resolved'))
      .verifiable(Times.once());

    this.messageHandlerResolverMock
      .setup(x => x.getHandlers(message))
      .returns(() => [ handlerMock1.object, handlerMock2.object ])
      .verifiable(Times.once());

    return this.delegatesToMessageHandlerMiddleware.handle(message, <any>nextMock.object)
      .subscribe(() => {
        handlerMock1.verifyAll();
        handlerMock2.verifyAll();
        nextMock.verifyAll();
      });
  }

  @test 'should resolve the handlers if promises'() {

    const message = 'message';

    const nextMock = Mock.ofType(Function);
    nextMock
      .setup(x => x(message))
      .returns(() => of('next-resolved'))
      .verifiable(Times.once());

    const handlerMock1 = Mock.ofType(Function);
    handlerMock1
      .setup(x => x(message))
      .returns(() => Promise.resolve('handler1-resolved'))
      .verifiable(Times.once());

    const handlerMock2 = Mock.ofType(Function);
    handlerMock2
      .setup(x => x(message))
      .returns(() => of('handler2-resolved'))
      .verifiable(Times.once());

    this.messageHandlerResolverMock
      .setup(x => x.getHandlers(message))
      .returns(() => [ handlerMock1.object, handlerMock2.object, ])
      .verifiable(Times.once());

    return this.delegatesToMessageHandlerMiddleware.handle(message, <any>nextMock.object)
      .subscribe(() => {
        handlerMock1.verifyAll();
        handlerMock2.verifyAll();
        nextMock.verifyAll();
      });
  }

  @test 'should resolve the handlers if not observables and return the handle value'() {

    const message = 'message';

    const nextMock = Mock.ofType(Function);
    nextMock
      .setup(x => x(message))
      .returns(() => of('next-resolved'))
      .verifiable(Times.once());

    const handlerMock1 = Mock.ofType(Function);
    handlerMock1
      .setup(x => x(message))
      .returns(() => 'handler1-resolved')
      .verifiable(Times.once());

    const handlerMock2 = Mock.ofType(Function);
    handlerMock2
      .setup(x => x(message))
      .returns(() => of('handler2-resolved'))
      .verifiable(Times.once());

    this.messageHandlerResolverMock
      .setup(x => x.getHandlers(message))
      .returns(() => [ handlerMock1.object, handlerMock2.object ])
      .verifiable(Times.once());

    return this.delegatesToMessageHandlerMiddleware.handle(message, <any>nextMock.object)
      .subscribe((result: any) => {

        result.should.be.eql([ 'handler1-resolved', 'handler2-resolved' ]);

        handlerMock1.verifyAll();
        handlerMock2.verifyAll();
        nextMock.verifyAll();
      });
  }

  @test 'should rejected and don\'t catch the error if an handler fails'() {

    const message = 'message';

    const nextMock = Mock.ofType(Function);
    nextMock
      .setup(x => x(message))
      .returns(() => of('next-resolved'))
      .verifiable(Times.never());

    const handlerMock1 = Mock.ofType(Function);
    handlerMock1
      .setup(x => x(message))
      .throws(new Error('handler1-error'))
      .verifiable(Times.once());

    const handlerMock2 = Mock.ofType(Function);
    handlerMock2
      .setup(x => x(message))
      .returns(() => of('handler2-resolved'))
      .verifiable(Times.once());

    this.messageHandlerResolverMock
      .setup(x => x.getHandlers(message))
      .returns(() => [ handlerMock1.object, handlerMock2.object ])
      .verifiable(Times.once());

    return this.delegatesToMessageHandlerMiddleware.handle(message, <any>nextMock.object)
      .subscribe(
      () => { throw new Error('it-should-be-never-called'); },
      (error: Error) => {

        error.message.should.be.eql('handler1-error');

        handlerMock1.verifyAll();
        nextMock.verifyAll();
      }
    );
  }

}
