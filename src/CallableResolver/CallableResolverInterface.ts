/**
 * Describes the interface for a resolver of callable objects.
 */
export interface CallableResolverInterface {
  /**
   * Resolves the identifier in a callable function.
   * @param {any} identifier The identifier to resolve.
   * @return {Function} The callable function based on this identifier.
   */
  resolve(identifier: any): Function;
}
