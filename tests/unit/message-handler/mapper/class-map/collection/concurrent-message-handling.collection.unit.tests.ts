
import { suite, test, should } from '@js-bus/test';
import { ConcurrentMessageHandlingCollection } from "../../../../../../src/lib/message-handler/mapper/class-map/collection/concurrent-message-handling.collection";

class MessageTest {}

class MessageHandlerTest {
  handler1() {}

  handler2() {}

  handler3() {}
}

@suite class MessageHandlingCollectionUnitTests {

  private concurrentMessageHandlingCollection: ConcurrentMessageHandlingCollection;

  before() {
    this.concurrentMessageHandlingCollection = new ConcurrentMessageHandlingCollection();
  }

  @test 'should return undefined if no collection is provided'() {
    should.equal(this.concurrentMessageHandlingCollection.getHandler('message'), undefined);
    should.equal(this.concurrentMessageHandlingCollection.getHandler(MessageTest), undefined);
    should.equal(this.concurrentMessageHandlingCollection.getMessage(() => {}), undefined);
  }

  @test 'should return the correct set of handlers given a message'() {

    const messageHandlerTest = new MessageHandlerTest();

    this.concurrentMessageHandlingCollection.setCollection([
      {
        message: 'message',
        handler: [
          messageHandlerTest.handler1,
          messageHandlerTest.handler2
        ]
      },
      {
        message: MessageTest,
        handler: [ messageHandlerTest.handler3 ]
      }
    ]);
    this.concurrentMessageHandlingCollection.getHandler('message').should.be.eql([
      messageHandlerTest.handler1,
      messageHandlerTest.handler2
    ]);
    this.concurrentMessageHandlingCollection.getHandler(MessageTest).should.be.eql([
      messageHandlerTest.handler3
    ]);
  }

  @test 'should return the correct message given a handler'() {

    const messageHandlerTest = new MessageHandlerTest();

    this.concurrentMessageHandlingCollection.setCollection([
      { message: 'message', handler: [ messageHandlerTest.handler2 ] },
      {
        message: MessageTest,
        handler: [
          messageHandlerTest.handler1,
          messageHandlerTest.handler3
        ]
      }
    ]);
    this.concurrentMessageHandlingCollection.getMessage(messageHandlerTest.handler2).should.be.eql('message');
    this.concurrentMessageHandlingCollection.getMessage(messageHandlerTest.handler1).should.be.eql(MessageTest);
    this.concurrentMessageHandlingCollection.getMessage(messageHandlerTest.handler3).should.be.eql(MessageTest);
  }
}
