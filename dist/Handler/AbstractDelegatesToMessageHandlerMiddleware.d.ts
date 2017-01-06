import { MessageBusMiddlewareInterface } from '../Middleware/MessageBusMiddlewareInterface';
import { MessageHandlerResolverInterface } from './Resolver/MessageHandlerResolverInterface';
/**
 * Allows to handle a message using a specific handler function.
 *
 * Its purpose is to provide the ability to handle the message and
 * propagate the message itself to the next middleware. It doesn't handle
 * errors.
 */
export declare abstract class AbstractDelegatesToMessageHandlerMiddleware implements MessageBusMiddlewareInterface {
    protected _messageHandlerResolver: MessageHandlerResolverInterface;
    /**
     * Creates a new DelegatesToMessageHandlerMiddleware.
     * @param _messageHandlerResolver
     */
    constructor(_messageHandlerResolver: MessageHandlerResolverInterface);
    /**
     * @inheritDoc
     */
    abstract handle(message: any, next: Function): any;
}
