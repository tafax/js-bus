
import { from, Observable, of } from 'rxjs';
import { concatMap, flatMap, map, toArray } from 'rxjs/operators';
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
         * Resolves the set of handlers based on the specified resolver.
         * Wraps the handlers into an observable to be sure to respect the chain.
         */
        map((currentMessage: T) => this._messageHandlerResolver.getHandlers(currentMessage)),
        concatMap((handlers) => from(handlers)
          .pipe(
            flatMap((handler: (message: T) => any) => this._wrapWithObservable(handler(message))),
            toArray()
          )
        ),
        concatMap(
          (result: any) => next(message)
            .pipe(
              map(() => result)
            )
        )
      );
  }
}
