
import { suite, test, IMock, Mock, Times } from '@js-bus/test';
import { CallableResolverInterface } from '../../../src/lib/callable-resolver/callable-resolver.interface';
import { MessageHandlingCollection } from '../../../src/lib/collection/message-handling.collection';
import { MessageTypeExtractorInterface } from '../../../src/lib/extractor/message-type-extractor.interface';
import { ClassMapHandlerResolver } from '../../../src/lib/resolver/class-map.handler-resolver';

@suite class ClassMapHandlerResolverUnitTests {

  private classMapHandlerResolver: ClassMapHandlerResolver;
  private messageHandlingCollectionMock: IMock<MessageHandlingCollection>;
  private callableResolverMock: IMock<CallableResolverInterface>;
  private extractorMock: IMock<MessageTypeExtractorInterface>;

  before() {

    this.messageHandlingCollectionMock = Mock.ofType(MessageHandlingCollection);
    this.callableResolverMock = Mock.ofType<CallableResolverInterface>();
    this.extractorMock = Mock.ofType<MessageTypeExtractorInterface>();

    this.classMapHandlerResolver = new ClassMapHandlerResolver(
      this.messageHandlingCollectionMock.object,
      this.callableResolverMock.object,
      this.extractorMock.object
    );
  }

  @test 'should return a set of callable functions to handle message'() {

    class MessageClass {}
    const message = new MessageClass();

    class HandlerClass { handle() {} }
    const handler = new HandlerClass();

    this.extractorMock
      .setup(x => x.extract(message))
      .returns(() => MessageClass)
      .verifiable(Times.once());

    this.messageHandlingCollectionMock
      .setup(x => x.getHandlers(MessageClass))
      .returns(() => [ HandlerClass ])
      .verifiable(Times.once());

    this.callableResolverMock
      .setup(x => x.resolve(HandlerClass))
      .returns(() => handler.handle)
      .verifiable(Times.once());

    this.classMapHandlerResolver.getHandlers(message).should.be.eql([ handler.handle ]);

    this.extractorMock.verifyAll();
    this.messageHandlingCollectionMock.verifyAll();
    this.callableResolverMock.verifyAll();
  }

  @test 'should re-throw the error if the extractor throws an error'() {

    class MessageClass {}
    const message = new MessageClass();

    this.extractorMock
      .setup(x => x.extract(message))
      .throws(new Error('extractor-error'))
      .verifiable(Times.once());

    (() => { this.classMapHandlerResolver.getHandlers(message); }).should.throw('extractor-error');

    this.extractorMock.verifyAll();
  }

  @test 'should re-throw the error if the collection throws an error'() {

    class MessageClass {}
    const message = new MessageClass();

    this.extractorMock
      .setup(x => x.extract(message))
      .returns(() => MessageClass)
      .verifiable(Times.once());

    this.messageHandlingCollectionMock
      .setup(x => x.getHandlers(MessageClass))
      .throws(new Error('collection-error'))
      .verifiable(Times.once());

    (() => { this.classMapHandlerResolver.getHandlers(message); }).should.throw('collection-error');

    this.extractorMock.verifyAll();
    this.messageHandlingCollectionMock.verifyAll();
  }

  @test 'should re-throw the error if the resolver throws an error'() {

    class MessageClass {}
    const message = new MessageClass();

    class HandlerClass {}

    this.extractorMock
      .setup(x => x.extract(message))
      .returns(() => MessageClass)
      .verifiable(Times.once());

    this.messageHandlingCollectionMock
      .setup(x => x.getHandlers(MessageClass))
      .returns(() => [ HandlerClass ])
      .verifiable(Times.once());

    this.callableResolverMock
      .setup(x => x.resolve(HandlerClass))
      .throws(new Error('resolver-error'))
      .verifiable(Times.once());

    (() => { this.classMapHandlerResolver.getHandlers(message); }).should.throw('resolver-error');

    this.extractorMock.verifyAll();
    this.messageHandlingCollectionMock.verifyAll();
    this.callableResolverMock.verifyAll();

  }
}
