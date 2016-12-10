
import * as Bluebird from 'bluebird';

import { Observable } from 'rxjs';
import { AbstractDelegatesToMessageHandlerMiddleware } from './AbstractDelegatesToMessageHandlerMiddleware';

/**
 * @inheritDoc
 */
export class ObservableDelegatesMessageHandlerMiddleware extends AbstractDelegatesToMessageHandlerMiddleware {

  /**
   * Wraps up a value with an observable. If needed.
   * @param {any} value The value to wrap up.
   * @returns {any} The observable value.
   * @private
   */
  private _wrapWithObservable(value: any): Observable<any> {
    if (value instanceof Observable) {
      return value;
    }

    if ((value instanceof Promise) || value instanceof Bluebird) {
      return Observable.fromPromise(value as Promise<any>);
    }

    return Observable.of(value);
  }

  /**
   * @inheritDoc
   */
  handle(message: any, next: Function): any {
    // It wraps the message with an observable.
    return this._wrapWithObservable(message)
      /**
       * Resolves the handler based on the specified resolver.
       * Wraps the handler into an observable to be sure to respect the chain.
       */
      .map((message: any) => this._messageHandlerResolver.getHandler(message))
      .flatMap((handler: Function) => this._wrapWithObservable(handler(message)))
      .do(() => this._wrapWithObservable(next(message)));
  }
}
