
import Promise from 'bluebird';
import { MessageBusMiddlewareInterface } from '../Middleware/MessageBusMiddlewareInterface';
import { MessageHandlerResolverInterface } from './Resolver/MessageHandlerResolverInterface';

export class DelegatesToMessageHandlerMiddleware implements MessageBusMiddlewareInterface {

  constructor(private _messageHandlerResolver: MessageHandlerResolverInterface) {}

  handle(message: any, next: Function): any {
    return Promise.coroutine(function*(messageObj, handler, nextFunc) {
      yield Promise.try(() => handler['handle'](messageObj));
      yield Promise.try(() => nextFunc(messageObj));
    })(message, this._messageHandlerResolver.resolve(message), next);
  }
}
