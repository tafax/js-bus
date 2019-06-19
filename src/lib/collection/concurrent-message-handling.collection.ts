
// Defines a convenience type to describe the message/handlers pair.
import { AbstractMessageHandlingCollection, MessageHandlerPair } from "./abstract-message-handling.collection";

/**
 * Defines a collection of the message/handlers pairs.
 * It just offers a convenience interface to store and retrieve
 * collection objects.
 */
export class ConcurrentMessageHandlingCollection extends AbstractMessageHandlingCollection<Function[]> {

  /**
   * @inheritDoc
   */
  protected _isHandlerBoundToPair(handler: any, pair: MessageHandlerPair<Function[]>): boolean {
    return pair.handler.some((value: Function) => value === handler);
  }

}
