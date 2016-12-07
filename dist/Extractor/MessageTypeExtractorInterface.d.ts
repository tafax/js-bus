export interface MessageTypeExtractorInterface {
    /**
     * Resolve the unique name of a message, e.g. the full class name
     *
     * @param {any} message
     * @return {Function}
     */
    extract(message: any): Function;
}
