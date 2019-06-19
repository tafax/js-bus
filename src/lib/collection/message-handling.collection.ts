
// Defines a convenience type to describe the message/handler pair.
import { AbstractMessageHandlingCollection, MessageHandlerPair } from "./abstract-message-handling.collection";

/**
 * Defines a collection of the message/handler pairs.
 * It just offers a convenience interface to store and retrieve
 * collection objects.
 */
export class MessageHandlingCollection extends AbstractMessageHandlingCollection<any> {

  /**
   * @inheritDoc
   */
  protected _isHandlerBoundToPair(handler: any, pair: MessageHandlerPair<any>): boolean {
    return pair.handler === handler;
  }

}
