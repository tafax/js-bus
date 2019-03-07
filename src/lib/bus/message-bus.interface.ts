
import { Observable } from 'rxjs';

/**
 * Base interface to describe a MessageBus object.
 */
export interface MessageBusInterface {

  /**
   * Handles the message passed to the bus.
   */
  handle<T>(message: T): Observable<any>;

}
