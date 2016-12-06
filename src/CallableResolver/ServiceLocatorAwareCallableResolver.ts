
import { CallableResolverInterface } from './CallableResolverInterface';
import { CanNotResolveCallableResolverError } from './Errors/CanNotResolveCallableError';
import { UndefinedHandleCallableError } from './Errors/UndefinedHandleCallableError';

/**
 * Resolves an object by using a specific function of a dependency resolver.
 */
export class ServiceLocatorAwareCallableResolver implements CallableResolverInterface {

  /**
   * Creates a new ServiceLocatorAwareCallableResolver.
   * @param {Function} _serviceLocator The service locator function.
   */
  constructor(private _serviceLocator: Function) {}

  /**
   * @inheritDoc
   */
  resolve(identifier: any): Function {
    if (typeof identifier === 'string') {
      return this.resolve(this._serviceLocator(identifier));
    }

    if (identifier instanceof Function) {
      return this.resolve(this._serviceLocator(identifier));
    }

    if (identifier instanceof Object) {
      if (!identifier.handle) {
        throw new UndefinedHandleCallableError(identifier);
      }
      return identifier.handle;
    }

    throw new CanNotResolveCallableResolverError(identifier);
  }
}
