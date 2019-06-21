
import { suite, test, IMock, Mock, Times } from '@js-bus/test';
import { of } from 'rxjs';
import { MessageHandlerMapperInterface } from '../../../src/lib/message-handler/mapper/message-handler-mapper.interface';
import { MessageHandlerInterface } from '../../../src/lib/message-handler/message-handler.interface';
import { MessageHandlerMiddleware } from '../../../src/lib/message-handler/message-handler.middleware';

@suite class MessageHandlerMiddlewareUnitTests {

  private delegatesToMessageHandlerMiddleware: MessageHandlerMiddleware;
  private messageHandlerMapperMock: IMock<MessageHandlerMapperInterface>;

  before() {

    this.messageHandlerMapperMock = Mock.ofType<MessageHandlerMapperInterface>();

    this.delegatesToMessageHandlerMiddleware = new MessageHandlerMiddleware(
      this.messageHandlerMapperMock.object
    );
  }

  @test 'should resolve the handlers if observables - Message Handler'() {

    const message = 'message';

    const nextMock = Mock.ofType(Function);
    nextMock
      .setup(x => x(message))
      .returns(() => of('next-resolved'))
      .verifiable(Times.once());

    const handlerMock = Mock.ofType<MessageHandlerInterface>();
    handlerMock
      .setup(x => x.handle(message))
      .returns(() => of('handler-resolved'))
      .verifiable(Times.once());

    this.messageHandlerMapperMock
      .setup(x => x.getHandlers(message))
      .returns(() => [ handlerMock.object.handle.bind(handlerMock.object) ])
      .verifiable(Times.once());

    return this.delegatesToMessageHandlerMiddleware.handle(message, <any>nextMock.object)
      .subscribe((result: string) => {

        result.should.be.eql([ 'handler-resolved' ]);

        handlerMock.verifyAll();
        nextMock.verifyAll();
      });
  }

  @test 'should resolve the handlers if observables - Function'() {

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

    this.messageHandlerMapperMock
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

  @test 'should resolve the handlers if not observables - Message Handler'() {

    const message = 'message';

    const nextMock = Mock.ofType(Function);
    nextMock
      .setup(x => x(message))
      .returns(() => of('next-resolved'))
      .verifiable(Times.once());

    const handlerMock = Mock.ofType<MessageHandlerInterface>();
    handlerMock
      .setup(x => x.handle(message))
      .returns(() => 'handler-resolved')
      .verifiable(Times.once());

    this.messageHandlerMapperMock
      .setup(x => x.getHandlers(message))
      .returns(() => [ handlerMock.object.handle.bind(handlerMock.object) ])
      .verifiable(Times.once());

    return this.delegatesToMessageHandlerMiddleware.handle(message, <any>nextMock.object)
      .subscribe(() => {
        handlerMock.verifyAll();
        nextMock.verifyAll();
      });
  }

  @test 'should resolve the handlers if not observables - Function'() {

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

    this.messageHandlerMapperMock
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

  @test 'should resolve the handlers if promises - Message Handler'() {

    const message = 'message';

    const nextMock = Mock.ofType(Function);
    nextMock
      .setup(x => x(message))
      .returns(() => of('next-resolved'))
      .verifiable(Times.once());

    const handlerMock = Mock.ofType<MessageHandlerInterface>();
    handlerMock
      .setup(x => x.handle(message))
      .returns(() => Promise.resolve('handler-resolved'))
      .verifiable(Times.once());

    this.messageHandlerMapperMock
      .setup(x => x.getHandlers(message))
      .returns(() => [ handlerMock.object.handle.bind(handlerMock.object) ])
      .verifiable(Times.once());

    return this.delegatesToMessageHandlerMiddleware.handle(message, <any>nextMock.object)
      .subscribe(() => {
        handlerMock.verifyAll();
        nextMock.verifyAll();
      });
  }

  @test 'should resolve the handlers if promises - Function'() {

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

    this.messageHandlerMapperMock
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

  @test 'should resolve the handlers if not observables and return the handle value - Message Handler'() {

    const message = 'message';

    const nextMock = Mock.ofType(Function);
    nextMock
      .setup(x => x(message))
      .returns(() => of('next-resolved'))
      .verifiable(Times.once());

    const handlerMock = Mock.ofType<MessageHandlerInterface>();
    handlerMock
      .setup(x => x.handle(message))
      .returns(() => 'handler-resolved')
      .verifiable(Times.once());

    this.messageHandlerMapperMock
      .setup(x => x.getHandlers(message))
      .returns(() => [ handlerMock.object.handle.bind(handlerMock.object) ])
      .verifiable(Times.once());

    return this.delegatesToMessageHandlerMiddleware.handle(message, <any>nextMock.object)
      .subscribe((result: any) => {

        result.should.be.eql([ 'handler-resolved' ]);

        handlerMock.verifyAll();
        nextMock.verifyAll();
      });
  }

  @test 'should resolve the handlers if not observables and return the handle value - Function'() {

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

    this.messageHandlerMapperMock
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

  @test 'should rejected and don\'t catch the error if an handler fails - Message Handler'() {

    const message = 'message';

    const nextMock = Mock.ofType(Function);
    nextMock
      .setup(x => x(message))
      .returns(() => of('next-resolved'))
      .verifiable(Times.never());

    const handlerMock = Mock.ofType<MessageHandlerInterface>();
    handlerMock
      .setup(x => x.handle(message))
      .throws(new Error('handler-error'))
      .verifiable(Times.once());

    this.messageHandlerMapperMock
      .setup(x => x.getHandlers(message))
      .returns(() => [ handlerMock.object.handle.bind(handlerMock.object) ])
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

  @test 'should rejected and don\'t catch the error if an handler fails - Function'() {

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

    this.messageHandlerMapperMock
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
