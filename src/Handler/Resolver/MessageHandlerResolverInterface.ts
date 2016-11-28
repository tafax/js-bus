
export interface MessageHandlerResolverInterface {

  /**
   * Resolve the message handler callable for the given message.
   * @param {any} message
   * @return Function
   */
    resolve(message: any);
}
