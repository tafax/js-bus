
import { suite, test } from 'mocha-typescript';
import 'should';
import * as sinon from 'sinon';
import { SinonStub } from 'sinon';
import 'sinon-as-promised';
import * as Promise from 'bluebird';

import { ServiceLocatorAwareCallableResolver } from '../../../src/CallableResolver/ServiceLocatorAwareCallableResolver';
import { CanNotResolveCallableResolverError } from '../../../src/CallableResolver/Errors/CanNotResolveCallableError';
import { UndefinedHandleCallableError } from '../../../src/CallableResolver/Errors/UndefinedHandleCallableError';

@suite class ServiceLocatorAwareCallableResolverUnitTest {

  resolver: ServiceLocatorAwareCallableResolver;
  serviceLocatorMock: Function;

  before() {
    this.serviceLocatorMock = sinon.stub() as Function;
    this.resolver = new ServiceLocatorAwareCallableResolver(this.serviceLocatorMock);
  }

  @test 'should resolve a string'() {
    let identifier: any = 'service';
    let service = { handle: () => {} };
    (this.serviceLocatorMock as SinonStub).withArgs(identifier).returns(service);
    this.resolver.resolve(identifier).should.be.eql(service.handle);
  }

  @test 'should resolve a class'() {
    class ClassIdentifier { handle() {} }
    let identifier = ClassIdentifier;
    let service = new ClassIdentifier();
    (this.serviceLocatorMock as SinonStub).withArgs(identifier).returns(service);
    this.resolver.resolve(identifier).should.be.eql(service.handle);
  }

  @test 'should resolve an object'() {
    class ClassIdentifier { handle() {} }
    let service = new ClassIdentifier();
    this.resolver.resolve(service).should.be.eql(service.handle);
    (this.serviceLocatorMock as SinonStub).calledWith(service).should.be.false();
  }

  @test 'should throw an error if it can\'t resolve the identifier'() {
    (() => {
      this.resolver.resolve(10)
    }).should.throw(CanNotResolveCallableResolverError);
  }

  @test 'should throw an error if the resolved object has no handle method'() {
    class ClassIdentifier {}
    let service = new ClassIdentifier();
    (() => {
      this.resolver.resolve(service);
    }).should.throw(UndefinedHandleCallableError);
    (this.serviceLocatorMock as SinonStub).calledWith(service).should.be.false();
  }
}

