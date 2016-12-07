
import { MessageHandlerResolverInterface } from './MessageHandlerResolverInterface';
import { CallableResolverInterface } from '../../CallableResolver/CallableResolverInterface';
import { MessageHandlingCollection } from '../../Collection/MessageHandlingCollection';
import { MessageTypeExtractorInterface } from '../../Extractor/MessageTypeExtractorInterface';

/**
 * Provides the ability to resolve a specific handler for a given message.
 * It is based on the handling collection and uses an extractor to
 * get the identifier of a message and a resolver to instantiate a new handler.
 */
export class ClassMapHandlerResolver implements MessageHandlerResolverInterface {

  /**
   * Creates a new ClassMapHandlerResolver.
   * @param {MessageHandlingCollection} _messageHandlingCollection The message handling collection.
   * @param {CallableResolverInterface} _callableResolver The resolver to instantiate the handler.
   * @param {MessageTypeExtractorInterface} _extractor The extractor to get the message identifier.
   */
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
    let identifier = this._extractor.extract(message);
    // Gets the handler based on the message identifier.
    let handler = this._messageHandlingCollection.getHandler(identifier);
    // Resolves the handler function.
    return this._callableResolver.resolve(handler);
  }
}
