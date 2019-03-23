
import { MessageHandlerInterface } from '../handler-resolver/message-handler.interface';

/**
 * Describes an interface to build an handler resolver
 * on top of the messages that it receives as parameter.
 */
export interface MessageHandlerMapperInterface {

  /**
   * Gets the handler for a message.
   */
  getHandler(message: any): MessageHandlerInterface;

}
