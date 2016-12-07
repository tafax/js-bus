
import { suite, test } from 'mocha-typescript';
import 'should';
import * as sinon from 'sinon';
import { SinonStub } from 'sinon';
import 'sinon-as-promised';
import * as Promise from 'bluebird';

import { ClassMapHandlerResolver } from '../../../../src/Handler/Resolver/ClassMapHandlerResolver';
import { MessageHandlingCollection } from '../../../../src/Collection/MessageHandlingCollection';
import { CallableResolverInterface } from '../../../../src/CallableResolver/CallableResolverInterface';
import { MessageTypeExtractorInterface } from '../../../../src/Extractor/MessageTypeExtractorInterface';

@suite class ClassMapHandlerResolverUnitTest {

  private classMapHandlerResolver: ClassMapHandlerResolver;
  private messageHandlingCollectionMock: MessageHandlingCollection;
  private callableResolverMock: CallableResolverInterface;
  private extractMock: MessageTypeExtractorInterface;

  before() {
    this.messageHandlingCollectionMock = <MessageHandlingCollection><any>{
      getHandler: sinon.stub()
    };

    this.callableResolverMock = <CallableResolverInterface>{
      resolve: sinon.stub()
    };

    this.extractMock = <MessageTypeExtractorInterface>{
      extract: sinon.stub()
    };

    this.classMapHandlerResolver = new ClassMapHandlerResolver(
      this.messageHandlingCollectionMock,
      this.callableResolverMock,
      this.extractMock
    );
  }

  @test 'should return a callable function to handle message'() {
    let message: 'message';
    let identifier = 'identifier';
    let handler = 'handler';
    let aFunction = () => {};
    (this.extractMock.extract as SinonStub).withArgs(message).returns(identifier);
    (this.messageHandlingCollectionMock.getHandler as SinonStub).withArgs(identifier).returns(handler);
    (this.callableResolverMock.resolve as SinonStub).withArgs(handler).returns(aFunction);
    this.classMapHandlerResolver.getHandler(message).should.be.eql(aFunction);
  }

  @test 'should re-throw the error if the extractor throws an error'() {
    let message: 'message';
    (this.extractMock.extract as SinonStub).withArgs(message).throws(new Error('extractor-error'));
    (() => { this.classMapHandlerResolver.getHandler(message); }).should.throw('extractor-error');
  }

  @test 'should re-throw the error if the collection throws an error'() {
    let message: 'message';
    let identifier = 'identifier';
    (this.extractMock.extract as SinonStub).withArgs(message).returns(identifier);
    (this.messageHandlingCollectionMock.getHandler as SinonStub).withArgs(identifier).throws(new Error('collection-error'));
    (() => { this.classMapHandlerResolver.getHandler(message); }).should.throw('collection-error');
  }

  @test 'should re-throw the error if the resolver throws an error'() {
    let message: 'message';
    let identifier = 'identifier';
    let handler = 'handler';
    (this.extractMock.extract as SinonStub).withArgs(message).returns(identifier);
    (this.messageHandlingCollectionMock.getHandler as SinonStub).withArgs(identifier).returns(handler);
    (this.callableResolverMock.resolve as SinonStub).withArgs(handler).throws(new Error('resolver-error'));
    (() => { this.classMapHandlerResolver.getHandler(message); }).should.throw('resolver-error');
  }
}
