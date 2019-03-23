
import { JsBusError } from '../../errors/js-bus.error';
import { MessageHandlerInterface } from '../message-handler.interface';
import { HandlerResolverInterface } from './handler-resolver.interface';

/**
 * Resolves an object by using a specific function of a dependency resolver.
 */
export class ServiceLocatorAwareHandlerResolver implements HandlerResolverInterface {

  constructor(private _serviceLocator: Function) {}

  /**
   * @inheritDoc
   */
  resolve(identifier: any): MessageHandlerInterface {
    if (typeof identifier === 'string') {
      return this.resolve(this._serviceLocator(identifier));
    }

    if (identifier instanceof Function) {
      return this.resolve(this._serviceLocator(identifier));
    }

    if (identifier instanceof Object) {
      if (!identifier.handle) {
        throw new JsBusError(`${identifier} is not a valid handler.`);
      }
      // Uses the bind to maintain the scope of the object.
      return identifier;
    }

    throw new JsBusError(`Unable to find the handler with ${identifier}`);
  }
}
