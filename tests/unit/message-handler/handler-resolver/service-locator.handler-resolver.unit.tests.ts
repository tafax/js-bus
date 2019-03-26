
import { suite, test, IMock, Mock, Times, It } from '@js-bus/test';
import { JsBusError } from '../../../../src/lib/errors/js-bus.error';
import { ServiceLocatorHandlerResolver } from '../../../../src/lib/message-handler/handler-resolver/service-locator/service-locator.handler-resolver';
import { ServiceLocatorInterface } from '../../../../src/lib/message-handler/handler-resolver/service-locator/service-locator.interface';
import { MessageHandlerInterface } from '../../../../src/lib/message-handler/message-handler.interface';

@suite class ServiceLocatorAwareHandlerResolverUnitTests {

  private resolver: ServiceLocatorHandlerResolver;
  private serviceLocatorMock: IMock<ServiceLocatorInterface>;

  before() {
    this.serviceLocatorMock = Mock.ofType<ServiceLocatorInterface>();
    this.resolver = new ServiceLocatorHandlerResolver(this.serviceLocatorMock.object);
  }

  @test 'should resolve a string'() {

    const identifier = 'service';
    class ClassIdentifier { handle() {} }
    const service = new ClassIdentifier();

    this.serviceLocatorMock
      .setup(x => x.get(identifier))
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
      .setup(x => x.get(identifier))
      .returns(() => service)
      .verifiable(Times.once());

    this.resolver.resolve(identifier).should.be.eql(service);

    this.serviceLocatorMock.verifyAll();
  }

  @test 'should resolve an object'() {

    class ClassIdentifier { handle() {} }
    const service = new ClassIdentifier();

    this.serviceLocatorMock
      .setup(x => x.get(It.isAny()))
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
      .setup(x => x.get(It.isAny()))
      .returns(() => <MessageHandlerInterface>service)
      .verifiable(Times.never());

    (() => {
      this.resolver.resolve(service);
    }).should.throw(JsBusError);
  }
}

