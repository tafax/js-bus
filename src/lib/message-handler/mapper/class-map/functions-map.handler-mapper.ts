
import { MessageHandlerMapperInterface } from '../message-handler-mapper.interface';
import { ConcurrentMessageHandlingCollection } from './collection/concurrent-message-handling.collection';
import { MessageTypeExtractorInterface } from './extractor/message-type-extractor.interface';

/**
 * Provides the ability to resolve a set of handlers bound to a given message.
 */
export class FunctionsMapHandlerMapper implements MessageHandlerMapperInterface {

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
