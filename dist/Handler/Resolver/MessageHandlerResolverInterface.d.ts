/**
 * Describes an interface to build an handler resolver
 * on top of the messages that it receives as parameter.
 */
export interface MessageHandlerResolverInterface {
    /**
     * Gets the handler for a message.
     * @param {any} message The message to use to resolve the handler.
     * @return {Function} The handler function to handle the message.
     */
    getHandler(message: any): Function;
}
