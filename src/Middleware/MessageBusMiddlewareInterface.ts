/**
 * Base interface to represents middlewares for the bus.
 */
export interface MessageBusMiddlewareInterface {
  /**
   * Handles the message and calls the next middleware in the chain.
   * @param {any} message The message to handle.
   * @param {Function} next The next middleware function to call.
   * @returns {any} The handled object.
   */
  handle(message: any, next: Function): any;
}
