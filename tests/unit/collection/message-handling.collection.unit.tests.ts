
import { suite, test, skip, should } from '@js-bus/test';
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
    should.equal(this.messageHandlingCollection.getHandlers('message'), undefined);
    should.equal(this.messageHandlingCollection.getMessage('handler'), undefined);
    should.equal(this.messageHandlingCollection.getHandlers(MessageTest), undefined);
    should.equal(this.messageHandlingCollection.getMessage(MessageHandlerTest), undefined);
  }

  @test 'should return the correct handlers given a message'() {
    this.messageHandlingCollection.setCollection([
      { message: 'message', handlers: [ 'handler' ] },
      { message: MessageTest, handlers: [ MessageHandlerTest ] }
    ]);
    this.messageHandlingCollection.getHandlers('message').should.be.eql([ 'handler' ]);
    this.messageHandlingCollection.getHandlers(MessageTest).should.be.eql([ MessageHandlerTest ]);
  }

  @test 'should return the correct message given a handler'() {
    this.messageHandlingCollection.setCollection([
      { message: 'message', handlers: [ 'handler' ] },
      { message: MessageTest, handlers: [ MessageHandlerTest ] }
    ]);
    this.messageHandlingCollection.getMessage('handler').should.be.eql('message');
    this.messageHandlingCollection.getMessage(MessageHandlerTest).should.be.eql(MessageTest);
  }

  @test @skip 'should throw error if there are duplications in the collection using string'() {
    (() => {
      this.messageHandlingCollection.setCollection([
        { message: 'message', handlers: [ 'handler' ] },
        { message: 'message', handlers: [ 'another handler' ] },
        { message: MessageTest, handlers: [ MessageHandlerTest ] }
      ]);
    }).should.throw(JsBusError);
  }

  @test @skip 'should throw error if there are duplications in the collection using classes'() {
    (() => {
      this.messageHandlingCollection.setCollection([
        { message: 'message', handlers: [ 'handler' ] },
        { message: MessageTest, handlers: [ MessageHandlerTest ] },
        { message: MessageTest, handlers: [ Function ] }
      ]);
    }).should.throw(JsBusError);
  }
}
