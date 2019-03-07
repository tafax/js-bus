
import { Observable } from 'rxjs';
import { MessageBusMiddlewareInterface } from '../Middleware/MessageBusMiddlewareInterface';
import { MessageHandlerResolverInterface } from './Resolver/MessageHandlerResolverInterface';

/**
 * Allows to handle a message using a specific handler function.
 *
 * Its purpose is to provide the ability to handle the message and
 * propagate the message itself to the next middleware. It doesn't handle
 * errors.
 */
export abstract class AbstractDelegatesToMessageHandlerMiddleware implements MessageBusMiddlewareInterface {

  /**
   * Creates a new DelegatesToMessageHandlerMiddleware.
   * @param _messageHandlerResolver
   */
  constructor(protected _messageHandlerResolver: MessageHandlerResolverInterface) {}

  /**
   * @inheritDoc
   */
  abstract handle<T>(message: T, next: (message: T) => Observable<any>): Observable<any>;
}
