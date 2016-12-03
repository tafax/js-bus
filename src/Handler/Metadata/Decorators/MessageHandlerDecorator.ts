
import 'reflect-metadata';
import 'core-js/es6/symbol';

/**
 * The key used to stores the metadata for the handler.
 * @type {symbol}
 */
export const messageHandlerMetadataKey = Symbol.for('messageBus:handler');

/**
 * Decorator factory to create e decorator and use it to specify an handler
 * for the message.
 * @param {Function} handler The handler constructor function.
 * @returns {(target:Object) => void}
 * @constructor
 */
export function MessageHandler(handler: Function) {
  return function(target: Object) {
    //noinspection TypeScriptUnresolvedFunction
    Reflect.defineMetadata(messageHandlerMetadataKey, handler, target);
  }
}
