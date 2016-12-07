
import { suite, test } from 'mocha-typescript';
import * as should from 'should';
import * as sinon from 'sinon';
import { SinonStub } from 'sinon';
import 'sinon-as-promised';
import * as Promise from 'bluebird';
import { MessageHandlingCollection } from '../../../src/Collection/MessageHandlingCollection';

class MessageTest {}
class MessageHandlerTest {}

@suite class MessageHandlingCollectionUnitTest {

  private messageHandlingCollection: MessageHandlingCollection;

  before() {
    this.messageHandlingCollection = new MessageHandlingCollection();
  }

  @test 'should return undefined if no collection is provided'() {
    should(this.messageHandlingCollection.getHandler('message')).be.undefined();
    should(this.messageHandlingCollection.getMessage('handler')).be.undefined();
    should(this.messageHandlingCollection.getHandler(MessageTest)).be.undefined();
    should(this.messageHandlingCollection.getMessage(MessageHandlerTest)).be.undefined();
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
}
