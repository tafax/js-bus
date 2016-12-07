
import * as _ from 'lodash';

// Defines a convenience type to describe the message/handler pair.
export declare type MessageHandlerPair = { message: any, handler: any };

/**
 * Defines a collection of the message/handler pairs.
 * It just offers a convenience interface to store and retrieve
 * collection objects.
 *
 * TODO: Handles the duplications. How to handle same message different handlers?
 */
export class MessageHandlingCollection {

  /**
   * Creates a new MessageHandlingCollection.
   * @param {MessageHandlerPair[]} [_collection] The initial collection.
   */
  constructor(private _collection?: MessageHandlerPair[]) {}

  /**
   * Sets a collection. It will override the old one.
   * @param {MessageHandlerPair[]} collection The new collection.
   */
  setCollection(collection: MessageHandlerPair[]) {
    this._collection = collection;
  }

  /**
   * Gets a handler given a specific message.
   * @param {any} message The message used as key.
   * @returns {any} The handler found.
   */
  getHandler(message: any): any {
    return _.get(_.find(this._collection, { message: message }), 'handler');
  }

  /**
   * Gets a message given a specific handler.
   * @param {any} handler The handler used as key.
   * @returns {any} The message found.
   */
  getMessage(handler: any): any {
    return _.get(_.find(this._collection, { handler: handler }), 'message');
  }
}
