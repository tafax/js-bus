
import { JsBusError } from '../../../../errors/js-bus.error';

// Defines a convenience type to describe the message/handler pair.
export interface MessageHandlerPair { message: any; handler: any; };

/**
 * Defines a collection of the message/handler pairs.
 * It just offers a convenience interface to store and retrieve
 * collection objects.
 */
export class MessageHandlingCollection {

  /**
   * Checks the duplications in the collection.
   */
  private _checksDuplications() {
    // Gets all messages.
    const messages = this._collection
      .map((pair: MessageHandlerPair) => pair.message);

    // Sets removes the duplications by design.
    const messagesSet = new Set(messages);
    const messagesArray = Array.from(messagesSet);

    // Checks if there is at least a duplication.
    const isDuplicated = messagesArray.length < messages.length;

    // If not, we are fine.
    if (!isDuplicated) {
      return;
    }

    // Otherwise, throws an error.
    throw new JsBusError(`There are duplications in the messages-handlers collection.`);
  }

  constructor(private _collection: MessageHandlerPair[] = []) {
    this._checksDuplications();
  }

  /**
   * Sets a collection. It will override the old one.
   */
  setCollection(collection: MessageHandlerPair[]) {
    this._collection = collection;
    this._checksDuplications();
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
