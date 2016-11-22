/**
 * Base interface to describe a MessageBus object.
 */
export interface MessageBusInterface {

  /**
   * Handles the message passed to the bus.
   * @param {any} message The message to handle with the bus.
   * @returns {any} Returns the handled object.
   */
  handle(message: any): any;
}
