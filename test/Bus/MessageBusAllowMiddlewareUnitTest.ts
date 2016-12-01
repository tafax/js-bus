
import 'reflect-metadata';
import { MessageHandler, messageHandlerMetadataKey } from '../../src/Handler/Metadata/Decorators/MessageHandlerDecorator';

import { suite, test } from 'mocha-typescript';
import 'should';
import * as sinon from 'sinon';
import { SinonStub } from 'sinon';
import 'sinon-as-promised';

import { MessageBusAllowMiddleware } from '../../src/Bus/MessageBusAllowMiddleware';
import {MessageBusMiddlewareInterface} from "../../src/Middleware/MessageBusMiddlewareInterface";

describe('MessageBusAllowMiddlewareTest', () => {

  describe('EmptyState', () => {
    @suite class MessageBusAllowMiddlewareUnitTest {

      messageBus: MessageBusAllowMiddleware;

      before() {
        this.messageBus = new MessageBusAllowMiddleware();
      }

      @test 'should return an empty middleware'() {
        this.messageBus.middlewares.should.be.empty();
      }

      @test 'should append a middleware'() {
        let middleware = <MessageBusMiddlewareInterface>{};
        this.messageBus.appendMiddleware(middleware);
        this.messageBus.middlewares.should.have.length(1);

        let anotherMiddleware = <MessageBusMiddlewareInterface>{};
        this.messageBus.appendMiddleware(anotherMiddleware);
        this.messageBus.middlewares.should.have.length(2);

        this.messageBus.middlewares[0].should.be.eql(middleware);
        this.messageBus.middlewares[1].should.be.eql(anotherMiddleware);
      }

      @test 'should prepend a middleware'() {
        let middleware = <MessageBusMiddlewareInterface>{};
        this.messageBus.prependMiddleware(middleware);
        this.messageBus.middlewares.should.have.length(1);

        let anotherMiddleware = <MessageBusMiddlewareInterface>{};
        this.messageBus.prependMiddleware(anotherMiddleware);
        this.messageBus.middlewares.should.have.length(2);

        this.messageBus.middlewares[0].should.be.eql(anotherMiddleware);
        this.messageBus.middlewares[1].should.be.eql(middleware);
      }

      @test 'should handle the message calling the first middleware'() {
        let middleware = <MessageBusMiddlewareInterface>{ handle: sinon.stub() };
        this.messageBus.appendMiddleware(middleware);

        this.messageBus.handle('message');
        (middleware.handle as SinonStub).withArgs(
          sinon.match((message: any) => {
            message.should.be.eql('message');
            return true;
          }),
          sinon.match((callback: any) => {
            callback.should.be.Function();
            return true;
          })
        ).called.should.true();
      }

      @test 'should handle the message calling the all middlewares'() {
        let anotherMiddleware = <MessageBusMiddlewareInterface>{ handle: sinon.stub() };
        let middleware = <MessageBusMiddlewareInterface>{ handle: (message: any, next: Function) => { next(message); } };
        this.messageBus.appendMiddleware(middleware);
        this.messageBus.appendMiddleware(anotherMiddleware);

        this.messageBus.handle('message');

        (anotherMiddleware.handle as SinonStub).withArgs(
          sinon.match((message: any) => {
            message.should.be.eql('message');
            return true;
          }),
          sinon.match((callback: any) => {
            callback.should.be.Function();
            return true;
          })
        ).called.should.true();
      }

    }
  });

  describe('FullState', () => {
    @suite class MessageBusAllowMiddlewareUnitTest {

      messageBus: MessageBusAllowMiddleware;
      middleware1: MessageBusMiddlewareInterface;
      middleware2: MessageBusMiddlewareInterface;
      middleware3: MessageBusMiddlewareInterface;

      before() {
        this.middleware1 = <MessageBusMiddlewareInterface>{
          handle: (message: any, next: any) => next(message)
        };
        this.middleware2 = <MessageBusMiddlewareInterface>{
          handle: (message: any, next: any) => next(message)
        };
        this.middleware3 = <MessageBusMiddlewareInterface>{
          handle: sinon.stub()
        };

        this.messageBus = new MessageBusAllowMiddleware([
          this.middleware1,
          this.middleware2,
          this.middleware3
        ]);
      }

      @test 'should return an empty middleware'() {
        this.messageBus.middlewares.should.be.length(3);
      }

      @test 'should append a middleware'() {
        let middleware = <MessageBusMiddlewareInterface>{};
        this.messageBus.appendMiddleware(middleware);
        this.messageBus.middlewares.should.have.length(4);

        let anotherMiddleware = <MessageBusMiddlewareInterface>{};
        this.messageBus.appendMiddleware(anotherMiddleware);
        this.messageBus.middlewares.should.have.length(5);

        this.messageBus.middlewares[0].should.be.eql(this.middleware1);
        this.messageBus.middlewares[1].should.be.eql(this.middleware2);
        this.messageBus.middlewares[2].should.be.eql(this.middleware3);
        this.messageBus.middlewares[3].should.be.eql(middleware);
        this.messageBus.middlewares[4].should.be.eql(anotherMiddleware);
      }

      @test 'should prepend a middleware'() {
        let middleware = <MessageBusMiddlewareInterface>{};
        this.messageBus.prependMiddleware(middleware);
        this.messageBus.middlewares.should.have.length(4);

        let anotherMiddleware = <MessageBusMiddlewareInterface>{};
        this.messageBus.prependMiddleware(anotherMiddleware);
        this.messageBus.middlewares.should.have.length(5);

        this.messageBus.middlewares[0].should.be.eql(anotherMiddleware);
        this.messageBus.middlewares[1].should.be.eql(middleware);
        this.messageBus.middlewares[2].should.be.eql(this.middleware1);
        this.messageBus.middlewares[3].should.be.eql(this.middleware2);
        this.messageBus.middlewares[4].should.be.eql(this.middleware3);
      }

      @test 'should handle the message calling all middlewares'() {
        this.messageBus.handle('message');
        (this.middleware3.handle as SinonStub).withArgs(
          sinon.match((message: any) => {
            message.should.be.eql('message');
            return true;
          }),
          sinon.match((callback: any) => {
            callback.should.be.Function();
            return true;
          })
        ).called.should.true();
      }

    }
  });

});
