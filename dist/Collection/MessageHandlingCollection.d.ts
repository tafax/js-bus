export declare type MessageHandlerPair = {
    message: any;
    handler: any;
};
/**
 * Defines a collection of the message/handler pairs.
 * It just offers a convenience interface to store and retrieve
 * collection objects.
 *
 * TODO: Handles the duplications. How to handle same message different handlers?
 */
export declare class MessageHandlingCollection {
    private _collection;
    /**
     * Creates a new MessageHandlingCollection.
     * @param {MessageHandlerPair[]} [_collection] The initial collection.
     */
    constructor(_collection?: MessageHandlerPair[]);
    /**
     * Sets a collection. It will override the old one.
     * @param {MessageHandlerPair[]} collection The new collection.
     */
    setCollection(collection: MessageHandlerPair[]): void;
    /**
     * Gets a handler given a specific message.
     * @param {any} message The message used as key.
     * @returns {any} The handler found.
     */
    getHandler(message: any): any;
    /**
     * Gets a message given a specific handler.
     * @param {any} handler The handler used as key.
     * @returns {any} The message found.
     */
    getMessage(handler: any): any;
}
