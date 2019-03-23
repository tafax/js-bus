
import { from, Observable, of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { MessageBusMiddlewareInterface } from '../bus/middleware/message-bus-middleware.interface';
import { MessageHandlerMapperInterface } from './mapper/message-handler-mapper.interface';
import { MessageHandlerInterface } from './message-handler.interface';

/**
 * Allows to handle a message using a specific handler function.
 *
 * Its purpose is to provide the ability to handle the message and
 * propagate the message itself to the next middleware. It doesn't handle
 * errors.
 */
export class MessageHandlerMiddleware implements MessageBusMiddlewareInterface {

  constructor(protected _messageHandlerMapper: MessageHandlerMapperInterface) {}

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
        map((currentMessage: T) => this._messageHandlerMapper.getHandler(currentMessage)),
        concatMap((handler: MessageHandlerInterface) => this._wrapWithObservable(handler.handle(message))),
        concatMap(
          (result: any) => next(message)
            .pipe(
              map(() => result)
            )
        )
      );
  }
}
