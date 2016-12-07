import { CallableResolverInterface } from './CallableResolverInterface';
/**
 * Resolves an object by using a specific function of a dependency resolver.
 */
export declare class ServiceLocatorAwareCallableResolver implements CallableResolverInterface {
    private _serviceLocator;
    /**
     * Creates a new ServiceLocatorAwareCallableResolver.
     * @param {Function} _serviceLocator The service locator function.
     */
    constructor(_serviceLocator: Function);
    /**
     * @inheritDoc
     */
    resolve(identifier: any): Function;
}
