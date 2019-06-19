
import { suite, test, IMock, Mock, Times } from '@js-bus/test';
import { FunctionsMapHandlerResolver } from "../../../src/lib/resolver/functions-map.handler-resolver";
import { MessageTypeExtractorInterface } from "../../../src/lib/extractor/message-type-extractor.interface";
import { ConcurrentMessageHandlingCollection } from "../../../src/lib/collection/concurrent-message-handling.collection";

@suite class FunctionsMapHandlerResolverUnitTests {

  private functionsMapHandlerResolverUnitTest: FunctionsMapHandlerResolver;
  private messageHandlingCollectionMock: IMock<ConcurrentMessageHandlingCollection>;
  private extractorMock: IMock<MessageTypeExtractorInterface>;

  before() {
    this.messageHandlingCollectionMock = Mock.ofType(ConcurrentMessageHandlingCollection);
    this.extractorMock = Mock.ofType<MessageTypeExtractorInterface>();

    this.functionsMapHandlerResolverUnitTest = new FunctionsMapHandlerResolver(
      this.messageHandlingCollectionMock.object,
      this.extractorMock.object
    );
  }

  @test 'should return a set of callable functions to handle the message'() {

    class MessageClass {}
    const message = new MessageClass();

    const handler1 = () => {};
    const handler2 = () => {};

    this.extractorMock
      .setup(x => x.extract(message))
      .returns(() => MessageClass)
      .verifiable(Times.once());

    this.messageHandlingCollectionMock
      .setup(x => x.getHandler(MessageClass))
      .returns(() => [ handler1, handler2 ])
      .verifiable(Times.once());

    this.functionsMapHandlerResolverUnitTest.getHandlers(message).should.be.eql([ handler1, handler2 ]);

    this.extractorMock.verifyAll();
    this.messageHandlingCollectionMock.verifyAll();
  }

  @test 'should re-throw the error if the extractor throws an error'() {

    class MessageClass {}
    const message = new MessageClass();

    this.extractorMock
      .setup(x => x.extract(message))
      .throws(new Error('extractor-error'))
      .verifiable(Times.once());

    (() => { this.functionsMapHandlerResolverUnitTest.getHandlers(message); }).should.throw('extractor-error');

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
      .setup(x => x.getHandler(MessageClass))
      .throws(new Error('collection-error'))
      .verifiable(Times.once());

    (() => { this.functionsMapHandlerResolverUnitTest.getHandlers(message); }).should.throw('collection-error');

    this.extractorMock.verifyAll();
    this.messageHandlingCollectionMock.verifyAll();
  }
}
