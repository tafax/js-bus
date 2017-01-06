import { AbstractDelegatesToMessageHandlerMiddleware } from './AbstractDelegatesToMessageHandlerMiddleware';
/**
 * @inheritDoc
 */
export declare class ObservableDelegatesMessageHandlerMiddleware extends AbstractDelegatesToMessageHandlerMiddleware {
    /**
     * Wraps up a value with an observable. If needed.
     * @param {any} value The value to wrap up.
     * @returns {any} The observable value.
     * @private
     */
    private _wrapWithObservable(value);
    /**
     * @inheritDoc
     */
    handle(message: any, next: Function): any;
}
