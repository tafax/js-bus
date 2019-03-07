
import { Observable, of } from 'rxjs';
import { MessageBusInterface } from './MessageBusInterface';
import { MessageBusMiddlewareInterface } from '../Middleware/MessageBusMiddlewareInterface';

/**
 * A MessageBus that allows to use middlewares.
 */
export class MessageBusAllowMiddleware implements MessageBusInterface {

  /**
   * Creates a new MessageBus with the given set of middlewares.
   * @param {MessageBusMiddlewareInterface[]} _middlewares The middleware to use during the handling of messages.
   */
  constructor(private _middlewares: MessageBusMiddlewareInterface[] = []) {}

  /**
   * Gets the middlewares added to the bus.
   * @returns {MessageBusMiddlewareInterface[]}
   */
  get middlewares(): MessageBusMiddlewareInterface[] {
    return this._middlewares;
  }

  /**
   * Creates the function for the next middleware.
   * @param {number} index The position of the middleware to create function for.
   * @returns {Function} The function to call to execute the middleware.
   */
  private _functionForNextMiddleware<T>(index: number): (message: T) => Observable<any> {
    if (!this._middlewares[index]) {
      return () => { return of(undefined); };
    }

    let middleware = this._middlewares[index];

    return (message: T) => middleware.handle(message, this._functionForNextMiddleware(index + 1));
  }

  /**
   * Appends a new middleware.
   * @param {MessageBusMiddlewareInterface} middleware The middleware to add at the bottom.
   */
  appendMiddleware(middleware: MessageBusMiddlewareInterface) {
    this._middlewares.push(middleware);
  }

  /**
   * Prepends a new middleware.
   * @param {MessageBusMiddlewareInterface} middleware The middleware to add at the top.
   */
  prependMiddleware(middleware: MessageBusMiddlewareInterface) {
    this._middlewares.unshift(middleware);
  }

  /**
   * @inheritDoc
   */
  handle<T>(message: T): Observable<any> {
    return this._functionForNextMiddleware(0)(message);
  }

}
