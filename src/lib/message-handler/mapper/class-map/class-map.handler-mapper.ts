
import { HandlerResolverInterface } from '../../handler-resolver/handler-resolver.interface';
import { MessageHandlerInterface } from '../../message-handler.interface';
import { MessageHandlerMapperInterface } from '../message-handler-mapper.interface';
import { MessageTypeExtractorInterface } from './extractor/message-type-extractor.interface';
import { MessageHandlingCollection } from './collection/message-handling.collection';

/**
 * Provides the ability to resolve a specific handler for a given message.
 * It is based on the handling collection and uses an extractor to
 * get the identifier of a message and a resolver to instantiate a new handler.
 */
export class ClassMapHandlerMapper implements MessageHandlerMapperInterface {

  constructor(
    private _messageHandlingCollection: MessageHandlingCollection,
    private _callableResolver: HandlerResolverInterface,
    private _extractor: MessageTypeExtractorInterface
  ) {}

  /**
   * @inheritDoc
   */
  getHandler(message: any): MessageHandlerInterface {
    // Extracts the identifier.
    const identifier = this._extractor.extract(message);
    // Gets the handler based on the message identifier.
    const handler = this._messageHandlingCollection.getHandler(identifier);
    // Resolves the handler function.
    return this._callableResolver.resolve(handler);
  }

}
