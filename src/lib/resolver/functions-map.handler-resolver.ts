
import { ConcurrentMessageHandlingCollection } from "../collection/concurrent-message-handling.collection";
import { MessageTypeExtractorInterface } from "../extractor/message-type-extractor.interface";
import { MessageHandlerResolverInterface } from "./message-handler-resolver.interface";

/**
 * Provides the ability to resolve a set of handlers bound to a given message.
 */
export class FunctionsMapHandlerResolver implements MessageHandlerResolverInterface {

  constructor(
      private _messageHandlingCollection: ConcurrentMessageHandlingCollection,
      private _extractor: MessageTypeExtractorInterface
  ) {}

    /**
     * @inheritDoc
     */
    getHandlers(message: any): Function[] {
      // Extracts the identifier.
      const identifier = this._extractor.extract(message);
      // Gets the function handlers based on the message identifier.
      return this._messageHandlingCollection.getHandler(identifier);
    }
}
