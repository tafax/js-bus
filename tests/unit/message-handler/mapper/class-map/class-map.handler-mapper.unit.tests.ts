
import { suite, test, IMock, Mock, Times } from '@js-bus/test';
import { HandlerResolverInterface } from '../../../../../src/lib/message-handler/handler-resolver/handler-resolver.interface';
import { ClassMapHandlerMapper } from '../../../../../src/lib/message-handler/mapper/class-map/class-map.handler-mapper';
import { MessageHandlingCollection } from '../../../../../src/lib/message-handler/mapper/class-map/collection/message-handling.collection';
import { MessageTypeExtractorInterface } from '../../../../../src/lib/message-handler/mapper/class-map/extractor/message-type-extractor.interface';

@suite class ClassMapHandlerMapperUnitTests {

  private classMapHandlerMapper: ClassMapHandlerMapper;
  private messageHandlingCollectionMock: IMock<MessageHandlingCollection>;
  private handlerResolverMock: IMock<HandlerResolverInterface>;
  private extractorMock: IMock<MessageTypeExtractorInterface>;

  before() {

    this.messageHandlingCollectionMock = Mock.ofType(MessageHandlingCollection);
    this.handlerResolverMock = Mock.ofType<HandlerResolverInterface>();
    this.extractorMock = Mock.ofType<MessageTypeExtractorInterface>();

    this.classMapHandlerMapper = new ClassMapHandlerMapper(
      this.messageHandlingCollectionMock.object,
      this.handlerResolverMock.object,
      this.extractorMock.object
    );
  }

  @test 'should return a callable function to handle message'() {

    class MessageClass {};
    const message = new MessageClass();

    class HandlerClass { handle() {} };
    const handler = new HandlerClass();

    this.extractorMock
      .setup(x => x.extract(message))
      .returns(() => MessageClass)
      .verifiable(Times.once());

    this.messageHandlingCollectionMock
      .setup(x => x.getHandler(MessageClass))
      .returns(() => HandlerClass)
      .verifiable(Times.once());

    this.handlerResolverMock
      .setup(x => x.resolve(HandlerClass))
      .returns(() => handler)
      .verifiable(Times.once());

    this.classMapHandlerMapper.getHandler(message).should.be.eql(handler);

    this.extractorMock.verifyAll();
    this.messageHandlingCollectionMock.verifyAll();
    this.handlerResolverMock.verifyAll();
  }

  @test 'should re-throw the error if the extractor throws an error'() {

    class MessageClass {};
    const message = new MessageClass();

    this.extractorMock
      .setup(x => x.extract(message))
      .throws(new Error('extractor-error'))
      .verifiable(Times.once());

    (() => { this.classMapHandlerMapper.getHandler(message); }).should.throw('extractor-error');

    this.extractorMock.verifyAll();
  }

  @test 'should re-throw the error if the collection throws an error'() {

    class MessageClass {};
    const message = new MessageClass();

    this.extractorMock
      .setup(x => x.extract(message))
      .returns(() => MessageClass)
      .verifiable(Times.once());

    this.messageHandlingCollectionMock
      .setup(x => x.getHandler(MessageClass))
      .throws(new Error('collection-error'))
      .verifiable(Times.once());

    (() => { this.classMapHandlerMapper.getHandler(message); }).should.throw('collection-error');

    this.extractorMock.verifyAll();
    this.messageHandlingCollectionMock.verifyAll();
  }

  @test 'should re-throw the error if the resolver throws an error'() {

    class MessageClass {};
    const message = new MessageClass();

    class HandlerClass {};

    this.extractorMock
      .setup(x => x.extract(message))
      .returns(() => MessageClass)
      .verifiable(Times.once());

    this.messageHandlingCollectionMock
      .setup(x => x.getHandler(MessageClass))
      .returns(() => HandlerClass)
      .verifiable(Times.once());

    this.handlerResolverMock
      .setup(x => x.resolve(HandlerClass))
      .throws(new Error('resolver-error'))
      .verifiable(Times.once());

    (() => { this.classMapHandlerMapper.getHandler(message); }).should.throw('resolver-error');

    this.extractorMock.verifyAll();
    this.messageHandlingCollectionMock.verifyAll();
    this.handlerResolverMock.verifyAll();

  }
}
