
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

// Collection
export { MessageHandlingCollection, MessageHandlerPair } from './lib/message-handler/mapper/class-map/collection/message-handling.collection';

// Extractor
export { MessageTypeExtractorInterface } from './lib/message-handler/mapper/class-map/extractor/message-type-extractor.interface';
export { FunctionConstructorMessageTypeExtractor } from './lib/message-handler/mapper/class-map/extractor/function-constructor.message-type-extractor';

// Class map handler mapper
export { ClassMapHandlerMapper } from './lib/message-handler/mapper/class-map/class-map.handler-mapper';

// Message handler mapper
export { MessageHandlerMapperInterface } from './lib/message-handler/mapper/message-handler-mapper.interface';

/* End Class Map */

// Message Handler
export { MessageHandlerInterface } from './lib/message-handler/message-handler.interface';
export { MessageHandlerMiddleware } from './lib/message-handler/message-handler.middleware';
