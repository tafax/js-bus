
import { JsBusError } from "../../../../errors/js-bus.error";

// Defines a convenience type to describe the message/handler pair.
export interface MessageHandlerPair<T = any> { message: any, handler: T }

export abstract class AbstractMessageHandlingCollection<T, U = T> {

  /**
   * The generic collection to connect a message with an handler.
   */
  protected _collection: MessageHandlerPair<T>[];

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

  constructor(collection: MessageHandlerPair<T>[] = []) {
    this._collection = collection;
    this._checksDuplications();
  }

  /**
   * Determines if the provided handler is bound to the given message-handler pair.
   */
  protected abstract _isHandlerBoundToPair(handler: U, pair: MessageHandlerPair<T>): boolean;

  /**
   * Sets a collection. It will override the old one.
   */
  setCollection(collection: MessageHandlerPair<T>[]) {
    this._collection = collection;
    this._checksDuplications();
  }

  /**
   * Gets a handler given a specific message.
   */
  getHandler(message: any): T {
    const handlers = this._collection
      .filter((pair: MessageHandlerPair<T>) => pair.message === message)
      .map((pair: MessageHandlerPair<T>) => pair.handler);

    return handlers.length > 0 ? handlers[0] : undefined;
  }

  /**
   * Gets a message given a specific handler.
   */
  getMessage(handler: U): any {
    const messages = this._collection
      .filter((pair: MessageHandlerPair<T>) => this._isHandlerBoundToPair(handler, pair))
      .map((pair: MessageHandlerPair<T>) => pair.message);

    return messages.length > 0 ? messages[0] : undefined;
  };
}
