
import { from, Observable, of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { AbstractDelegatesMessageHandlerMiddleware } from './abstract-delegates-message-handler.middleware';

/**
 * @inheritDoc
 */
export class ObservableDelegatesMessageHandlerMiddleware extends AbstractDelegatesMessageHandlerMiddleware {

  /**
   * Wraps up a value with an observable. If needed.
   */
  private _wrapWithObservable(value: any): Observable<any> {
    if (value instanceof Observable) {
      return value;
    }

    if (value instanceof Promise) {
      return from(value as Promise<any>);
    }

    return of(value);
  }

  /**
   * @inheritDoc
   */
  handle<T>(message: T, next: (message: T) => Observable<any>): Observable<any> {
    // It wraps the message with an observable.
    return this._wrapWithObservable(message)
      .pipe(
        /**
         * Resolves the handler based on the specified resolver.
         * Wraps the handler into an observable to be sure to respect the chain.
         */
        map((currentMessage: T) => this._messageHandlerResolver.getHandler(currentMessage)),
        concatMap((handler: (message: T) => any) => this._wrapWithObservable(handler(message))),
        concatMap(
          (result: any) => next(message)
            .pipe(
              map(() => result)
            )
        )
      );
  }
}