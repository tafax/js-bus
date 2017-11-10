
import * as Promise from 'bluebird';
import { AbstractDelegatesToMessageHandlerMiddleware } from './AbstractDelegatesToMessageHandlerMiddleware';
import { Observable } from 'rxjs/Observable';

/**
 * Allows to handle a message using a specific handler function.
 *
 * Its purpose is to provide the ability to handle the message and
 * propagate the message itself to the next middleware. It doesn't handle
 * errors.
 */
export class PromiseDelegatesMessageHandlerMiddleware extends AbstractDelegatesToMessageHandlerMiddleware {
  /**
   * Handles the message and propagate it to the next middleware.
   * @param {any} message The message to handle.
   * @param {Function} next The next middleware function.
   * @return {Promise<any>}
   */
  handle<T>(message: any, next: (message: T) => any): Observable<any> {
    // It resolves immediately the promise to allow
    // the chain to dealloc resources.
    return Observable.fromPromise(
      Promise.resolve([message, next])
        .spread((message: any, next: (message: T) => any) => {
          // Resolves the handler based on the specified resolver.
          let handler = this._messageHandlerResolver.getHandler(message);
          // Wraps the handler into a promise to be sure to respect
          // the chain.
          return Promise.try(() => handler(message))
            .then((result: any) => [message, next, result]);
        })
        // Calls the next middleware function.
        .spread((message: any, next: (message: T) => any, result: any) => {
          return Promise.resolve(result)
            .tap(() => next(message))
            .then(() => result);
        })
    );
  }
}
