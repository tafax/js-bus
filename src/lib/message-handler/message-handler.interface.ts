
import { Observable } from 'rxjs';

/**
 * Describes a handler object.
 */
export interface MessageHandlerInterface {

  /**
   * Handles the message.
   */
  handle(message: any): Observable<any> | Promise<any> | any;

}
