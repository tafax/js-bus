import { MessageBusInterface } from './MessageBusInterface';
import { MessageBusMiddlewareInterface } from '../Middleware/MessageBusMiddlewareInterface';
/**
 * A MessageBus that allows to use middlewares.
 */
export declare class MessageBusAllowMiddleware implements MessageBusInterface {
    private _middlewares;
    /**
     * Creates a new MessageBus with the given set of middlewares.
     * @param {MessageBusMiddlewareInterface[]} _middlewares The middleware to use during the handling of messages.
     */
    constructor(_middlewares?: MessageBusMiddlewareInterface[]);
    /**
     * Gets the middlewares added to the bus.
     * @returns {MessageBusMiddlewareInterface[]}
     */
    readonly middlewares: MessageBusMiddlewareInterface[];
    /**
     * Appends a new middleware.
     * @param {MessageBusMiddlewareInterface} middleware The middleware to add at the bottom.
     */
    appendMiddleware(middleware: MessageBusMiddlewareInterface): void;
    /**
     * Prepends a new middleware.
     * @param {MessageBusMiddlewareInterface} middleware The middleware to add at the top.
     */
    prependMiddleware(middleware: MessageBusMiddlewareInterface): void;
    /**
     * Creates the function for the next middleware.
     * @param {number} index The position of the middleware to create function for.
     * @returns {Function} The function to call to execute the middleware.
     * @private
     */
    private _functionForNextMiddleware(index);
    /**
     * @inheritDoc
     */
    handle(message: any): any;
}
