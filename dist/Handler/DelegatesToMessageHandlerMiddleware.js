"use strict";
var Promise = require('bluebird');
/**
 * Allows to handle a message using a specific handler function.
 *
 * Its purpose is to provide the ability to handle the message and
 * propagate the message itself to the next middleware. It doesn't handle
 * errors.
 */
var DelegatesToMessageHandlerMiddleware = (function () {
    /**
     * Creates a new DelegatesToMessageHandlerMiddleware.
     * @param _messageHandlerResolver
     */
    function DelegatesToMessageHandlerMiddleware(_messageHandlerResolver) {
        this._messageHandlerResolver = _messageHandlerResolver;
    }
    /**
     * Handles the message and propagate it to the next middleware.
     * @param {any} message The message to handle.
     * @param {Function} next The next middleware function.
     * @return {Bluebird<any>}
     */
    DelegatesToMessageHandlerMiddleware.prototype.handle = function (message, next) {
        var _this = this;
        // It resolves immediately the promise to allow
        // the chain to dealloc resources.
        return Promise.resolve([message, next])
            .spread(function (message, next) {
            // Resolves the handler based on the specified resolver.
            var handler = _this._messageHandlerResolver.getHandler(message);
            // Wraps the handler into a promise to be sure to respect
            // the chain.
            return Promise.try(function () { return handler(message); })
                .then(function () { return [message, next]; });
        })
            .spread(function (message, next) { return next(message); });
    };
    return DelegatesToMessageHandlerMiddleware;
}());
exports.DelegatesToMessageHandlerMiddleware = DelegatesToMessageHandlerMiddleware;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9IYW5kbGVyL0RlbGVnYXRlc1RvTWVzc2FnZUhhbmRsZXJNaWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxJQUFZLE9BQU8sV0FBTSxVQUFVLENBQUMsQ0FBQTtBQUlwQzs7Ozs7O0dBTUc7QUFDSDtJQUVFOzs7T0FHRztJQUNILDZDQUFvQix1QkFBd0Q7UUFBeEQsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUFpQztJQUFHLENBQUM7SUFFaEY7Ozs7O09BS0c7SUFDSCxvREFBTSxHQUFOLFVBQU8sT0FBWSxFQUFFLElBQWM7UUFBbkMsaUJBY0M7UUFiQywrQ0FBK0M7UUFDL0Msa0NBQWtDO1FBQ2xDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3BDLE1BQU0sQ0FBQyxVQUFDLE9BQVksRUFBRSxJQUFjO1lBQ25DLHdEQUF3RDtZQUN4RCxJQUFJLE9BQU8sR0FBRyxLQUFJLENBQUMsdUJBQXVCLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQy9ELHlEQUF5RDtZQUN6RCxhQUFhO1lBQ2IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBaEIsQ0FBZ0IsQ0FBQztpQkFDdkMsSUFBSSxDQUFDLGNBQU0sT0FBQSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBZixDQUFlLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUM7YUFFRCxNQUFNLENBQUMsVUFBQyxPQUFZLEVBQUUsSUFBYyxJQUFLLE9BQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFiLENBQWEsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFDSCwwQ0FBQztBQUFELENBN0JBLEFBNkJDLElBQUE7QUE3QlksMkNBQW1DLHNDQTZCL0MsQ0FBQSIsImZpbGUiOiJIYW5kbGVyL0RlbGVnYXRlc1RvTWVzc2FnZUhhbmRsZXJNaWRkbGV3YXJlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7IE1lc3NhZ2VCdXNNaWRkbGV3YXJlSW50ZXJmYWNlIH0gZnJvbSAnLi4vTWlkZGxld2FyZS9NZXNzYWdlQnVzTWlkZGxld2FyZUludGVyZmFjZSc7XG5pbXBvcnQgeyBNZXNzYWdlSGFuZGxlclJlc29sdmVySW50ZXJmYWNlIH0gZnJvbSAnLi9SZXNvbHZlci9NZXNzYWdlSGFuZGxlclJlc29sdmVySW50ZXJmYWNlJztcblxuLyoqXG4gKiBBbGxvd3MgdG8gaGFuZGxlIGEgbWVzc2FnZSB1c2luZyBhIHNwZWNpZmljIGhhbmRsZXIgZnVuY3Rpb24uXG4gKlxuICogSXRzIHB1cnBvc2UgaXMgdG8gcHJvdmlkZSB0aGUgYWJpbGl0eSB0byBoYW5kbGUgdGhlIG1lc3NhZ2UgYW5kXG4gKiBwcm9wYWdhdGUgdGhlIG1lc3NhZ2UgaXRzZWxmIHRvIHRoZSBuZXh0IG1pZGRsZXdhcmUuIEl0IGRvZXNuJ3QgaGFuZGxlXG4gKiBlcnJvcnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBEZWxlZ2F0ZXNUb01lc3NhZ2VIYW5kbGVyTWlkZGxld2FyZSBpbXBsZW1lbnRzIE1lc3NhZ2VCdXNNaWRkbGV3YXJlSW50ZXJmYWNlIHtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBEZWxlZ2F0ZXNUb01lc3NhZ2VIYW5kbGVyTWlkZGxld2FyZS5cbiAgICogQHBhcmFtIF9tZXNzYWdlSGFuZGxlclJlc29sdmVyXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tZXNzYWdlSGFuZGxlclJlc29sdmVyOiBNZXNzYWdlSGFuZGxlclJlc29sdmVySW50ZXJmYWNlKSB7fVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBtZXNzYWdlIGFuZCBwcm9wYWdhdGUgaXQgdG8gdGhlIG5leHQgbWlkZGxld2FyZS5cbiAgICogQHBhcmFtIHthbnl9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFuZGxlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBuZXh0IFRoZSBuZXh0IG1pZGRsZXdhcmUgZnVuY3Rpb24uXG4gICAqIEByZXR1cm4ge0JsdWViaXJkPGFueT59XG4gICAqL1xuICBoYW5kbGUobWVzc2FnZTogYW55LCBuZXh0OiBGdW5jdGlvbik6IGFueSB7XG4gICAgLy8gSXQgcmVzb2x2ZXMgaW1tZWRpYXRlbHkgdGhlIHByb21pc2UgdG8gYWxsb3dcbiAgICAvLyB0aGUgY2hhaW4gdG8gZGVhbGxvYyByZXNvdXJjZXMuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShbbWVzc2FnZSwgbmV4dF0pXG4gICAgICAuc3ByZWFkKChtZXNzYWdlOiBhbnksIG5leHQ6IEZ1bmN0aW9uKSA9PiB7XG4gICAgICAgIC8vIFJlc29sdmVzIHRoZSBoYW5kbGVyIGJhc2VkIG9uIHRoZSBzcGVjaWZpZWQgcmVzb2x2ZXIuXG4gICAgICAgIGxldCBoYW5kbGVyID0gdGhpcy5fbWVzc2FnZUhhbmRsZXJSZXNvbHZlci5nZXRIYW5kbGVyKG1lc3NhZ2UpO1xuICAgICAgICAvLyBXcmFwcyB0aGUgaGFuZGxlciBpbnRvIGEgcHJvbWlzZSB0byBiZSBzdXJlIHRvIHJlc3BlY3RcbiAgICAgICAgLy8gdGhlIGNoYWluLlxuICAgICAgICByZXR1cm4gUHJvbWlzZS50cnkoKCkgPT4gaGFuZGxlcihtZXNzYWdlKSlcbiAgICAgICAgICAudGhlbigoKSA9PiBbbWVzc2FnZSwgbmV4dF0pO1xuICAgICAgfSlcbiAgICAgIC8vIENhbGxzIHRoZSBuZXh0IG1pZGRsZXdhcmUgZnVuY3Rpb24uXG4gICAgICAuc3ByZWFkKChtZXNzYWdlOiBhbnksIG5leHQ6IEZ1bmN0aW9uKSA9PiBuZXh0KG1lc3NhZ2UpKTtcbiAgfVxufVxuIl19
