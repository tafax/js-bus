"use strict";
var CanNotResolveCallableError_1 = require('./Errors/CanNotResolveCallableError');
var UndefinedHandleCallableError_1 = require('./Errors/UndefinedHandleCallableError');
/**
 * Resolves an object by using a specific function of a dependency resolver.
 */
var ServiceLocatorAwareCallableResolver = (function () {
    /**
     * Creates a new ServiceLocatorAwareCallableResolver.
     * @param {Function} _serviceLocator The service locator function.
     */
    function ServiceLocatorAwareCallableResolver(_serviceLocator) {
        this._serviceLocator = _serviceLocator;
    }
    /**
     * @inheritDoc
     */
    ServiceLocatorAwareCallableResolver.prototype.resolve = function (identifier) {
        if (typeof identifier === 'string') {
            return this.resolve(this._serviceLocator(identifier));
        }
        if (identifier instanceof Function) {
            return this.resolve(this._serviceLocator(identifier));
        }
        if (identifier instanceof Object) {
            if (!identifier.handle) {
                throw new UndefinedHandleCallableError_1.UndefinedHandleCallableError(identifier);
            }
            // Uses the bind to maintain the scope of the object.
            return identifier.handle.bind(identifier);
        }
        throw new CanNotResolveCallableError_1.CanNotResolveCallableResolverError(identifier);
    };
    return ServiceLocatorAwareCallableResolver;
}());
exports.ServiceLocatorAwareCallableResolver = ServiceLocatorAwareCallableResolver;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DYWxsYWJsZVJlc29sdmVyL1NlcnZpY2VMb2NhdG9yQXdhcmVDYWxsYWJsZVJlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSwyQ0FBbUQscUNBQXFDLENBQUMsQ0FBQTtBQUN6Riw2Q0FBNkMsdUNBQXVDLENBQUMsQ0FBQTtBQUVyRjs7R0FFRztBQUNIO0lBRUU7OztPQUdHO0lBQ0gsNkNBQW9CLGVBQXlCO1FBQXpCLG9CQUFlLEdBQWYsZUFBZSxDQUFVO0lBQUcsQ0FBQztJQUVqRDs7T0FFRztJQUNILHFEQUFPLEdBQVAsVUFBUSxVQUFlO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sVUFBVSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3hELENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxVQUFVLFlBQVksUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDeEQsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLFVBQVUsWUFBWSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLE1BQU0sSUFBSSwyREFBNEIsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNyRCxDQUFDO1lBQ0QscURBQXFEO1lBQ3JELE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBRUQsTUFBTSxJQUFJLCtEQUFrQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFDSCwwQ0FBQztBQUFELENBOUJBLEFBOEJDLElBQUE7QUE5QlksMkNBQW1DLHNDQThCL0MsQ0FBQSIsImZpbGUiOiJDYWxsYWJsZVJlc29sdmVyL1NlcnZpY2VMb2NhdG9yQXdhcmVDYWxsYWJsZVJlc29sdmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBDYWxsYWJsZVJlc29sdmVySW50ZXJmYWNlIH0gZnJvbSAnLi9DYWxsYWJsZVJlc29sdmVySW50ZXJmYWNlJztcbmltcG9ydCB7IENhbk5vdFJlc29sdmVDYWxsYWJsZVJlc29sdmVyRXJyb3IgfSBmcm9tICcuL0Vycm9ycy9DYW5Ob3RSZXNvbHZlQ2FsbGFibGVFcnJvcic7XG5pbXBvcnQgeyBVbmRlZmluZWRIYW5kbGVDYWxsYWJsZUVycm9yIH0gZnJvbSAnLi9FcnJvcnMvVW5kZWZpbmVkSGFuZGxlQ2FsbGFibGVFcnJvcic7XG5cbi8qKlxuICogUmVzb2x2ZXMgYW4gb2JqZWN0IGJ5IHVzaW5nIGEgc3BlY2lmaWMgZnVuY3Rpb24gb2YgYSBkZXBlbmRlbmN5IHJlc29sdmVyLlxuICovXG5leHBvcnQgY2xhc3MgU2VydmljZUxvY2F0b3JBd2FyZUNhbGxhYmxlUmVzb2x2ZXIgaW1wbGVtZW50cyBDYWxsYWJsZVJlc29sdmVySW50ZXJmYWNlIHtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBTZXJ2aWNlTG9jYXRvckF3YXJlQ2FsbGFibGVSZXNvbHZlci5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gX3NlcnZpY2VMb2NhdG9yIFRoZSBzZXJ2aWNlIGxvY2F0b3IgZnVuY3Rpb24uXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlTG9jYXRvcjogRnVuY3Rpb24pIHt9XG5cbiAgLyoqXG4gICAqIEBpbmhlcml0RG9jXG4gICAqL1xuICByZXNvbHZlKGlkZW50aWZpZXI6IGFueSk6IEZ1bmN0aW9uIHtcbiAgICBpZiAodHlwZW9mIGlkZW50aWZpZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXNvbHZlKHRoaXMuX3NlcnZpY2VMb2NhdG9yKGlkZW50aWZpZXIpKTtcbiAgICB9XG5cbiAgICBpZiAoaWRlbnRpZmllciBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXNvbHZlKHRoaXMuX3NlcnZpY2VMb2NhdG9yKGlkZW50aWZpZXIpKTtcbiAgICB9XG5cbiAgICBpZiAoaWRlbnRpZmllciBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgaWYgKCFpZGVudGlmaWVyLmhhbmRsZSkge1xuICAgICAgICB0aHJvdyBuZXcgVW5kZWZpbmVkSGFuZGxlQ2FsbGFibGVFcnJvcihpZGVudGlmaWVyKTtcbiAgICAgIH1cbiAgICAgIC8vIFVzZXMgdGhlIGJpbmQgdG8gbWFpbnRhaW4gdGhlIHNjb3BlIG9mIHRoZSBvYmplY3QuXG4gICAgICByZXR1cm4gaWRlbnRpZmllci5oYW5kbGUuYmluZChpZGVudGlmaWVyKTtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgQ2FuTm90UmVzb2x2ZUNhbGxhYmxlUmVzb2x2ZXJFcnJvcihpZGVudGlmaWVyKTtcbiAgfVxufVxuIl19
