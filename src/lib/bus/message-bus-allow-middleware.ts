
import { Observable, of } from 'rxjs';
import { MessageBusInterface } from './message-bus.interface';
import { MessageBusMiddlewareInterface } from '../middleware/message-bus-middleware.interface';

/**
 * A MessageBus that allows to use middlewares.
 */
export class MessageBusAllowMiddleware implements MessageBusInterface {

  constructor(private _middlewares: MessageBusMiddlewareInterface[] = []) {}

  /**
   * Gets the middlewares added to the bus.
   */
  get middlewares(): MessageBusMiddlewareInterface[] {
    return this._middlewares;
  }

  /**
   * Creates the function for the next middleware.
   */
  private _functionForNextMiddleware<T>(index: number): (message: T) => Observable<any> {
    if (!this._middlewares[index]) {
      return () => of(undefined);
    }

    const middleware = this._middlewares[index];
    return (message: T) => middleware.handle(message, this._functionForNextMiddleware(index + 1));
  }

  /**
   * Appends a new middleware.
   */
  appendMiddleware(middleware: MessageBusMiddlewareInterface) {
    this._middlewares.push(middleware);
  }

  /**
   * Prepends a new middleware.
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
