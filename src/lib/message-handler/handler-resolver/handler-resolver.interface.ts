
import { MessageHandlerInterface } from '../message-handler.interface';

/**
 * Describes the interface for a resolver of handler objects.
 */
export interface HandlerResolverInterface {

  /**
   * Resolves the identifier in a handler.
   */
  resolve(identifier: any): MessageHandlerInterface;

}
