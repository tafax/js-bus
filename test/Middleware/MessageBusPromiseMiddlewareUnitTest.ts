
import { suite, test } from 'mocha-typescript';
import 'should';
import * as sinon from 'sinon';
import { SinonStub } from 'sinon';
import 'sinon-as-promised';
import * as Promise from 'bluebird';

import { MessageBusPromiseMiddleware } from '../../src/Middleware/MessageBusPromiseMiddleware';

@suite class MessageBusPromiseMiddlewareUnitTest {

  middleware: MessageBusPromiseMiddleware;

  before() {
    this.middleware = new MessageBusPromiseMiddleware();
  }

  @test 'should wait until next is resolved'() {
    let promiseFunction = (message: any) => {
      message.should.be.eql('message');
      return Promise.delay(500);
    };

    // This is a workaround since the Should.js types doesn't have promises functions.
    return (this.middleware.handle('message', promiseFunction).should.be as any)
      .fulfilled();
  }

  @test 'should wait until next is rejected'() {
    let promiseFunction = (message: any) => {
      message.should.be.eql('message');
      return Promise.delay(500).then(() => Promise.reject(new Error()));
    };

    // This is a workaround since the Should.js types doesn't have promises functions.
    return (this.middleware.handle('message', promiseFunction).should.be as any)
      .rejectedWith(Error);
  }

}
