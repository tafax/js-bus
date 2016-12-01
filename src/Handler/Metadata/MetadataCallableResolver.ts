
import 'reflect-metadata';
import { CallableResolverInterface } from '../../CallableResolver/CallableResolverInterface';
import { messageHandlerMetadataKey } from './Decorators/MessageHandlerDecorator'

/**
 * Allows to resolves a callable function based on the metadata
 * of the object class provided as parameter.
 *
 * Its purpose is to use a callable resolver to handle the class metadata. It will
 * use these metadata as the identifier to resolve.
 */
export class MetadataCallableResolver {

  /**
   * Creates a new MetadataCallableResolver.
   * @param {CallableResolverInterface} _callableResolver The callable resolved used to get the function.
   */
  constructor(private _callableResolver: CallableResolverInterface) {}

  /**
   * Gets the callable function based on the object class given as parameter.
   * @param {Function} objectClass The object to use to extract the metadata.
   * @returns {Function} The callable function.
   */
  get(objectClass: Function): Function {
    //noinspection TypeScriptUnresolvedFunction
    let metadata = Reflect.getMetadata(messageHandlerMetadataKey, objectClass);
    return this._callableResolver.resolve(metadata);
  }

}
