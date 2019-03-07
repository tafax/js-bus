
import { CallableResolverInterface } from '../callable-resolver/callable-resolver.interface';
import { MessageHandlingCollection } from '../collection/message-handling.collection';
import { MessageTypeExtractorInterface } from '../extractor/message-type-extractor.interface';
import { MessageHandlerResolverInterface } from './message-handler-resolver.interface';

/**
 * Provides the ability to resolve a specific handler for a given message.
 * It is based on the handling collection and uses an extractor to
 * get the identifier of a message and a resolver to instantiate a new handler.
 */
export class ClassMapHandlerResolver implements MessageHandlerResolverInterface {

  constructor(
    private _messageHandlingCollection: MessageHandlingCollection,
    private _callableResolver: CallableResolverInterface,
    private _extractor: MessageTypeExtractorInterface
  ) {}

  /**
   * @inheritDoc
   */
  getHandler(message: any): Function {
    // Extracts the identifier.
    const identifier = this._extractor.extract(message);
    // Gets the handler based on the message identifier.
    const handler = this._messageHandlingCollection.getHandler(identifier);
    // Resolves the handler function.
    return this._callableResolver.resolve(handler);
  }

}
