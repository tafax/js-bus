
import { MessageHandlerInterface } from '../../message-handler.interface';

/**
 * Defines the service locator interface to be used
 * inside the service locator handler resolver.
 */
export interface ServiceLocatorInterface {

  /**
   * Gets a handler based on a token.
   */
  get<T>(token: any): MessageHandlerInterface;

}
