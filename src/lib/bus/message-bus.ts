
import { Observable, of } from 'rxjs';
import { publishReplay, refCount } from 'rxjs/operators';
import { MessageBusInterface } from './message-bus.interface';
import { MessageBusMiddlewareInterface } from './middleware/message-bus-middleware.interface';

/**
 * A MessageBus that allows to use middlewares.
 */
export class MessageBus implements MessageBusInterface {

  constructor(private _middlewares: MessageBusMiddlewareInterface[] = []) {}

  /**
   * Gets the middlewares added to the bus.
   */
  get middlewares(): MessageBusMiddlewareInterface[] {
    return this._middlewares;
  }

  /**
   * Creates the function for the next middleware.
   */
  private _functionForNextMiddleware<T>(index: number): (message: T) => Observable<any> {
    if (!this._middlewares[index]) {
      return () => of(undefined);
    }

    const middleware = this._middlewares[index];
    return (message: T) => middleware.handle(message, this._functionForNextMiddleware(index + 1));
  }

  /**
   * Appends a new middleware.
   */
  appendMiddleware(middleware: MessageBusMiddlewareInterface) {
    this._middlewares.push(middleware);
  }

  /**
   * Prepends a new middleware.
   */
  prependMiddleware(middleware: MessageBusMiddlewareInterface) {
    this._middlewares.unshift(middleware);
  }

  /**
   * @inheritDoc
   */
  handle<T>(message: T): Observable<any> {
    // Creates the middleware observables chain.
    const execution$ = this._functionForNextMiddleware(0)(message)
      .pipe(
        /**
         * Makes sure it can be shared between subscriptions.
         * NOTE: shareReplay can't be used here since it shares the last emitted value, but
         * if there is an error it close the internal subscription and the new one
         * will re-execute all the callbacks in the operators so we risk to execute everything twice.
         */
        publishReplay(1),
        refCount()
      );

    // Executes the middlewares chain.
    execution$.subscribe(
      () => {}, // Ignores the nexts.
      () => {} // Ignores the errors to avoid logging unexpected errors.
    );

    return execution$;
  }

}
