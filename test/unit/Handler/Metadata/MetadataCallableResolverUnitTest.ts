
import { suite, test } from 'mocha-typescript';
import 'should';
import * as sinon from 'sinon';
import { SinonStub } from 'sinon';
import 'sinon-as-promised';
import * as Promise from 'bluebird';
import * as mockery from 'mockery';

// This allows us to mock the global variable.
declare var Reflect: any;

import { CallableResolverInterface } from '../../../../src/CallableResolver/CallableResolverInterface';

@suite class MetadataCallableResolverUnitTest {

  private metadataCallableResolver: any;

  private callableResolverMock: CallableResolverInterface;
  private reflectMock: any;

  static before() {
    mockery.enable();
  }

  before() {
    mockery.deregisterAll();
    // We defines a local mock for the global variable.
    Reflect = {
      getMetadata: sinon.stub()
    };
    this.reflectMock = Reflect;

    // Registers the mock to be imported from the class.
    mockery.registerAllowable('../../../../src/Handler/Metadata/MetadataCallableResolver');
    mockery.registerMock('reflect-metadata', this.reflectMock);
    mockery.registerMock('./Decorators/MessageHandlerDecorator', { messageHandlerMetadataKey: 'fake-key' });

    this.callableResolverMock = <CallableResolverInterface>{
      resolve: sinon.stub()
    };

    // Imports the class after the mock registration.
    let MetadataCallableResolver = require('../../../../src/Handler/Metadata/MetadataCallableResolver').MetadataCallableResolver;
    this.metadataCallableResolver = new MetadataCallableResolver(this.callableResolverMock);
  }

  static after() {
    mockery.deregisterAll();
    mockery.disable();
  }

  @test 'should try to resolve using the object class metadata'() {
    class Message {};
    class MessageHandler {}
    let aFunction = () => {};

    (this.reflectMock.getMetadata as SinonStub).withArgs('fake-key', Message).returns(MessageHandler);
    (this.callableResolverMock.resolve as SinonStub).withArgs(MessageHandler).returns(aFunction);

    this.metadataCallableResolver.get(Message).should.be.eql(aFunction);
  }

}
