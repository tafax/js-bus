import { MessageTypeExtractorInterface } from './MessageTypeExtractorInterface';
/**
 * Provides the ability to get the function constructor of an object.
 * At runtime, it can be considered the class of the object.
 */
export declare class FunctionConstructorMessageTypeExtractor implements MessageTypeExtractorInterface {
    /**
     * @inheritDoc
     */
    extract(message: any): Function;
}
