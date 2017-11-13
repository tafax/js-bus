
import { Observable } from 'rxjs/Observable';

/**
 * Base interface to represents middlewares for the bus.
 */
export interface MessageBusMiddlewareInterface {
  /**
   * Handles the message and calls the next middleware in the chain.
   * @param {T} message The message to handle.
   * @param {(message: T) => Observable<any>} next The next middleware function to call.
   * @returns {Observable<any>} The handled object.
   */
  handle<T>(message: T, next: (message: T) => Observable<any>): Observable<any>;
}
