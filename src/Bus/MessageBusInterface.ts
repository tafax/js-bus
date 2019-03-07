
import { Observable } from 'rxjs';

/**
 * Base interface to describe a MessageBus object.
 */
export interface MessageBusInterface {

  /**
   * Handles the message passed to the bus.
   * @param {T} message The message to handle with the bus.
   * @returns {Observable<any>} Returns the handled object as a stream.
   */
  handle<T>(message: T): Observable<any>;
}
