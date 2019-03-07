
// Defines a convenience type to describe the message/handler pair.
export interface MessageHandlerPair { message: any; handler: any; };

/**
 * Defines a collection of the message/handler pairs.
 * It just offers a convenience interface to store and retrieve
 * collection objects.
 *
 * TODO: Handles the duplications. How to handle same message different handlers?
 */
export class MessageHandlingCollection {

  constructor(private _collection: MessageHandlerPair[] = []) {}

  /**
   * Sets a collection. It will override the old one.
   */
  setCollection(collection: MessageHandlerPair[]) {
    this._collection = collection;
  }

  /**
   * Gets a handler given a specific message.
   */
  getHandler(message: any): any {
    const handlers = this._collection
      .filter((pair: MessageHandlerPair) => pair.message === message)
      .map((pair: MessageHandlerPair) => pair.handler);

    return handlers.length > 0 ? handlers[0] : undefined;
  }

  /**
   * Gets a message given a specific handler.
   */
  getMessage(handler: any): any {
    const messages = this._collection
      .filter((pair: MessageHandlerPair) => pair.handler === handler)
      .map((pair: MessageHandlerPair) => pair.message);

    return messages.length > 0 ? messages[0] : undefined;
  }

}
