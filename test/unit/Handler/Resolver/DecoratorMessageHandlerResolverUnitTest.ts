
import { suite, test } from 'mocha-typescript';
import 'should';
import * as sinon from 'sinon';
import { SinonStub } from 'sinon';
import 'sinon-as-promised';
import * as Promise from 'bluebird';

import { DecoratorMessageHandlerResolver } from '../../../../src/Handler/Resolver/DecoratorMessageHandlerResolver';
import { MessageTypeExtractorInterface } from '../../../../src/Extractor/MessageTypeExtractorInterface';
import { MetadataCallableResolver } from '../../../../src/Handler/Metadata/MetadataCallableResolver';

@suite class DecoratorMessageHandlerResolverUnitTest {

  private decoratorMessageHandler: DecoratorMessageHandlerResolver;

  private messageTypeResolverMock: MessageTypeExtractorInterface;
  private metadataCallableResolverMock: MetadataCallableResolver;

  before() {
    this.messageTypeResolverMock = <MessageTypeExtractorInterface>{
      extract: sinon.stub()
    };
    this.metadataCallableResolverMock = <MetadataCallableResolver><any>{
      get: sinon.stub()
    };

    this.decoratorMessageHandler = new DecoratorMessageHandlerResolver(
      this.messageTypeResolverMock,
      this.metadataCallableResolverMock
    );
  }

  @test 'should resolve the object type and use it to get the handler'() {
    let message = 'message';
    let objectType = 'object-type';
    let handler = () => {};

    (this.messageTypeResolverMock.extract as SinonStub).withArgs(message).returns(objectType);
    (this.metadataCallableResolverMock.get as SinonStub).withArgs(objectType).returns(handler);

    this.decoratorMessageHandler.getHandler(message).should.be.eql(handler);
  }

}
