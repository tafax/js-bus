
import { Observable } from 'rxjs';
import { MessageBusMiddlewareInterface } from '../middleware/message-bus-middleware.interface';
import { MessageHandlerResolverInterface } from '../resolver/message-handler-resolver.interface';

/**
 * Allows to handle a message using a specific handler function.
 *
 * Its purpose is to provide the ability to handle the message and
 * propagate the message itself to the next middleware. It doesn't handle
 * errors.
 */
export abstract class AbstractDelegatesMessageHandlerMiddleware implements MessageBusMiddlewareInterface {

  constructor(protected _messageHandlerResolver: MessageHandlerResolverInterface) {}

  /**
   * @inheritDoc
   */
  abstract handle<T>(message: T, next: (message: T) => Observable<any>): Observable<any>;

}
