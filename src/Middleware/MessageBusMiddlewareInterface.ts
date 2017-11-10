
import { Observable } from 'rxjs/Observable';

/**
 * Base interface to represents middlewares for the bus.
 */
export interface MessageBusMiddlewareInterface {
  /**
   * Handles the message and calls the next middleware in the chain.
   * @param {any} message The message to handle.
   * @param {Function} next The next middleware function to call.
   * @returns {T} The handled object.
   */
  handle<T>(message: T, next: (message: T) => Observable<any>): Observable<any>;
}
