
// Adding the polyfills.
import 'ts-polyfill/lib/es2015-core';
import 'ts-polyfill/lib/es2015-promise';
import 'ts-polyfill/lib/es2015-collection';

// Bus
export { MessageBusInterface } from './lib/bus/message-bus.interface';
export { MessageBus } from './lib/bus/message-bus';

// Handler resolver
export { HandlerResolverInterface } from './lib/message-handler/handler-resolver/handler-resolver.interface';
export { ServiceLocatorInterface } from './lib/message-handler/handler-resolver/service-locator/service-locator.interface';
export { ServiceLocatorHandlerResolver } from './lib/message-handler/handler-resolver/service-locator/service-locator.handler-resolver';
export { ServiceLocatorAwareHandlerResolver } from './lib/message-handler/handler-resolver/service-locator-aware/service-locator-aware.handler-resolver';

/* Class Map */

// Collections
export { MessageHandlingCollection } from './lib/message-handler/mapper/class-map/collection/message-handling.collection';
export { ConcurrentMessageHandlingCollection } from './lib/message-handler/mapper/class-map/collection/concurrent-message-handling.collection';
export { MessageHandlerPair } from './lib/message-handler/mapper/class-map/collection/abstract-message-handling.collection';

// Extractor
export { MessageTypeExtractorInterface } from './lib/message-handler/mapper/class-map/extractor/message-type-extractor.interface';
export { FunctionConstructorMessageTypeExtractor } from './lib/message-handler/mapper/class-map/extractor/function-constructor.message-type-extractor';

// Message handler mapper
export { MessageHandlerMapperInterface } from './lib/message-handler/mapper/message-handler-mapper.interface';
export { ClassMapHandlerMapper } from './lib/message-handler/mapper/class-map/class-map.handler-mapper';
export { FunctionsMapHandlerMapper } from './lib/message-handler/mapper/class-map/functions-map.handler-mapper';

/* End Class Map */

// Message Handler
export { MessageHandlerInterface } from './lib/message-handler/message-handler.interface';
export { MessageHandlerMiddleware } from './lib/message-handler/message-handler.middleware';
