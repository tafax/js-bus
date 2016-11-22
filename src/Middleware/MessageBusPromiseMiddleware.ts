
import * as Promise from 'bluebird';
import { MessageBusMiddlewareInterface } from './MessageBusMiddlewareInterface';

/**
 * A middleware to handle Promises and schedule the middleware execution.
 */
export class MessageBusPromiseMiddleware implements MessageBusMiddlewareInterface {

  /**
   * Handles the next middleware by scheduling the execution
   * with a Promise.
   * @param {any} message The message to handle.
   * @param {Function} next The next middleware to execute.
   * @returns {Bluebird<U>}
   */
  handle(message: any, next: Function): Promise<any> {
    return Promise.try(() => next(message));
  }

}
