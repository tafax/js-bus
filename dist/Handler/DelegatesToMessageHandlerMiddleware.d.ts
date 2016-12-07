import { MessageBusMiddlewareInterface } from '../Middleware/MessageBusMiddlewareInterface';
import { MessageHandlerResolverInterface } from './Resolver/MessageHandlerResolverInterface';
/**
 * Allows to handle a message using a specific handler function.
 *
 * Its purpose is to provide the ability to handle the message and
 * propagate the message itself to the next middleware. It doesn't handle
 * errors.
 */
export declare class DelegatesToMessageHandlerMiddleware implements MessageBusMiddlewareInterface {
    private _messageHandlerResolver;
    /**
     * Creates a new DelegatesToMessageHandlerMiddleware.
     * @param _messageHandlerResolver
     */
    constructor(_messageHandlerResolver: MessageHandlerResolverInterface);
    /**
     * Handles the message and propagate it to the next middleware.
     * @param {any} message The message to handle.
     * @param {Function} next The next middleware function.
     * @return {Bluebird<any>}
     */
    handle(message: any, next: Function): any;
}
