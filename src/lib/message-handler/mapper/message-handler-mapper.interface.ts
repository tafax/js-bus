
/**
 * Describes an interface to build an handler resolver
 * on top of the messages that it receives as parameter.
 */
export interface MessageHandlerMapperInterface {

  /**
   * Gets the handler for a message.
   */
  getHandlers(message: any): Function[];

}
