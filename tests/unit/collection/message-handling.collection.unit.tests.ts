
import { suite, test, should } from '@js-bus/test';
import { MessageHandlingCollection } from '../../../src/lib/collection/message-handling.collection';
import { JsBusError } from '../../../src/lib/errors/js-bus.error';

class MessageTest {}
class MessageHandlerTest {}

@suite class MessageHandlingCollectionUnitTests {

  private messageHandlingCollection: MessageHandlingCollection;

  before() {
    this.messageHandlingCollection = new MessageHandlingCollection();
  }

  @test 'should return undefined if no collection is provided'() {
    should.equal(this.messageHandlingCollection.getHandler('message'), undefined);
    should.equal(this.messageHandlingCollection.getMessage('handler'), undefined);
    should.equal(this.messageHandlingCollection.getHandler(MessageTest), undefined);
    should.equal(this.messageHandlingCollection.getMessage(MessageHandlerTest), undefined);
  }

  @test 'should return the correct handler given a message'() {
    this.messageHandlingCollection.setCollection([
      { message: 'message', handler: 'handler' },
      { message: MessageTest, handler: MessageHandlerTest }
    ]);
    this.messageHandlingCollection.getHandler('message').should.be.eql('handler');
    this.messageHandlingCollection.getHandler(MessageTest).should.be.eql(MessageHandlerTest);
  }

  @test 'should return the correct message given a handler'() {
    this.messageHandlingCollection.setCollection([
      { message: 'message', handler: 'handler' },
      { message: MessageTest, handler: MessageHandlerTest }
    ]);
    this.messageHandlingCollection.getMessage('handler').should.be.eql('message');
    this.messageHandlingCollection.getMessage(MessageHandlerTest).should.be.eql(MessageTest);
  }

  @test 'should throw error if there are duplications in the collection using string'() {
    (() => {
      this.messageHandlingCollection.setCollection([
        { message: 'message', handler: 'handler' },
        { message: 'message', handler: 'another handler' },
        { message: MessageTest, handler: MessageHandlerTest }
      ]);
    }).should.throw(JsBusError);
  }

  @test 'should throw error if there are duplications in the collection using classes'() {
    (() => {
      this.messageHandlingCollection.setCollection([
        { message: 'message', handler: 'handler' },
        { message: MessageTest, handler: MessageHandlerTest },
        { message: MessageTest, handler: Function }
      ]);
    }).should.throw(JsBusError);
  }
}
