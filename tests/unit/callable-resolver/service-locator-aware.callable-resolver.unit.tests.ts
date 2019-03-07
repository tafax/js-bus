
import { suite, test, IMock, Mock, Times, It } from '@js-bus/test';
import { ServiceLocatorAwareCallableResolver } from '../../../src/lib/callable-resolver/service-locator-aware.callable-resolver';
import { JsBusError } from '../../../src/lib/errors/js-bus.error';

@suite class ServiceLocatorAwareCallableResolverUnitTests {

  private resolver: ServiceLocatorAwareCallableResolver;
  private serviceLocatorMock: IMock<Function>;

  before() {
    this.serviceLocatorMock = Mock.ofType<Function>();
    this.resolver = new ServiceLocatorAwareCallableResolver(this.serviceLocatorMock.object);
  }

  @test 'should resolve a string'() {

    const identifier = 'service';
    const service = { handle: () => {} };

    this.serviceLocatorMock
      .setup(x => x(identifier))
      .returns(() => service)
      .verifiable(Times.once());

    this.resolver.resolve(identifier).toString().should.be.eql(service.handle.bind(service).toString());

    this.serviceLocatorMock.verifyAll();
  }

  @test 'should resolve a class'() {

    class ClassIdentifier { handle() {} }

    const identifier = ClassIdentifier;
    const service = new ClassIdentifier();

    this.serviceLocatorMock
      .setup(x => x(identifier))
      .returns(() => service)
      .verifiable(Times.once());

    this.resolver.resolve(identifier).toString().should.be.eql(service.handle.bind(service).toString());

    this.serviceLocatorMock.verifyAll();
  }

  @test 'should resolve an object'() {

    class ClassIdentifier { handle() {} }
    const service = new ClassIdentifier();

    this.serviceLocatorMock
      .setup(x => x(It.isAny()))
      .returns(() => service)
      .verifiable(Times.never());

    this.resolver.resolve(service).toString().should.be.eql(service.handle.bind(service).toString());

    this.serviceLocatorMock.verifyAll();
  }

  @test 'should throw an error if it can\'t resolve the identifier'() {
    (() => {
      this.resolver.resolve(10);
    }).should.throw(JsBusError);
  }

  @test 'should throw an error if the resolved object has no handle method'() {

    class ClassIdentifier {}
    const service = new ClassIdentifier();

    this.serviceLocatorMock
      .setup(x => x(It.isAny()))
      .returns(() => service)
      .verifiable(Times.never());

    (() => {
      this.resolver.resolve(service);
    }).should.throw(JsBusError);
  }
}

