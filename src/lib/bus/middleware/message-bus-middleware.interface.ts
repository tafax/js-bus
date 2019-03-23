
import { Observable } from 'rxjs';

/**
 * Base interface to represents middlewares for the bus.
 */
export interface MessageBusMiddlewareInterface {

  /**
   * Handles the message and calls the next middleware in the chain.
   */
  handle<T>(message: T, next: (message: T) => Observable<any>): Observable<any>;

}
