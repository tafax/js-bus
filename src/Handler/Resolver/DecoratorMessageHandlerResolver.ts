
import { MessageHandlerResolverInterface } from './MessageHandlerResolverInterface';
import { MetadataCallableResolver } from '../Metadata/MetadataCallableResolver';
import { MessageTypeExtractorInterface } from '../../Extractor/MessageTypeExtractorInterface';

/**
 * Allows to resolve a message handle based on the message itself.
 */
export class DecoratorMessageHandlerResolver implements MessageHandlerResolverInterface {

  /**
   * Creates a new DecoratorMessageHandlerResolver.
   * @param {MessageTypeExtractorInterface} _messageTypeExtractor The service to resolve the message type.
   * @param {MetadataCallableResolver} _metadataCallableResolver The resolver based on metadata added to the message object.
   */
  constructor(
    private _messageTypeExtractor: MessageTypeExtractorInterface,
    private _metadataCallableResolver: MetadataCallableResolver
  ) {}

  /**
   * @inheritDoc
   */
  getHandler(message: any): Function {
    // Gets the object type.
    let objectType = this._messageTypeExtractor.extract(message);
    // Uses the type to fetch metadata and resolving the handler.
    return this._metadataCallableResolver.get(objectType);
  }
}
