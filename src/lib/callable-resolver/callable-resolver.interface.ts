
/**
 * Describes the interface for a resolver of callable objects.
 */
export interface CallableResolverInterface {

  /**
   * Resolves the identifier in a callable function.
   */
  resolve(identifier: any): Function;

}
