
import { suite, test, IMock, Mock, Times, It } from '@js-bus/test';
import { JsBusError } from '../../../../src/lib/errors/js-bus.error';
import { ServiceLocatorAwareHandlerResolver } from '../../../../src/lib/message-handler/handler-resolver/service-locator-aware.handler-resolver';

@suite class ServiceLocatorAwareHandlerResolverUnitTests {

  private resolver: ServiceLocatorAwareHandlerResolver;
  private serviceLocatorMock: IMock<Function>;

  before() {
    this.serviceLocatorMock = Mock.ofType<Function>();
    this.resolver = new ServiceLocatorAwareHandlerResolver(this.serviceLocatorMock.object);
  }

  @test 'should resolve a string'() {

    const identifier = 'service';
    const service = { handle: () => {} };

    this.serviceLocatorMock
      .setup(x => x(identifier))
      .returns(() => service)
      .verifiable(Times.once());

    this.resolver.resolve(identifier).should.be.eql(service);

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

    this.resolver.resolve(identifier).should.be.eql(service);

    this.serviceLocatorMock.verifyAll();
  }

  @test 'should resolve an object'() {

    class ClassIdentifier { handle() {} }
    const service = new ClassIdentifier();

    this.serviceLocatorMock
      .setup(x => x(It.isAny()))
      .returns(() => service)
      .verifiable(Times.never());

    this.resolver.resolve(service).should.be.eql(service);

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

