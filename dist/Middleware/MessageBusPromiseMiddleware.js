"use strict";
var Promise = require('bluebird');
/**
 * A middleware to handle Promises and schedule the middleware execution.
 */
var MessageBusPromiseMiddleware = (function () {
    function MessageBusPromiseMiddleware() {
    }
    /**
     * Handles the next middleware by scheduling the execution
     * with a Promise.
     * @param {any} message The message to handle.
     * @param {Function} next The next middleware to execute.
     * @returns {Bluebird<U>}
     */
    MessageBusPromiseMiddleware.prototype.handle = function (message, next) {
        return Promise.try(function () { return next(message); });
    };
    return MessageBusPromiseMiddleware;
}());
exports.MessageBusPromiseMiddleware = MessageBusPromiseMiddleware;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9NaWRkbGV3YXJlL01lc3NhZ2VCdXNQcm9taXNlTWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsSUFBWSxPQUFPLFdBQU0sVUFBVSxDQUFDLENBQUE7QUFHcEM7O0dBRUc7QUFDSDtJQUFBO0lBYUEsQ0FBQztJQVhDOzs7Ozs7T0FNRztJQUNILDRDQUFNLEdBQU4sVUFBTyxPQUFZLEVBQUUsSUFBYztRQUNqQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFNLE9BQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFiLENBQWEsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFSCxrQ0FBQztBQUFELENBYkEsQUFhQyxJQUFBO0FBYlksbUNBQTJCLDhCQWF2QyxDQUFBIiwiZmlsZSI6Ik1pZGRsZXdhcmUvTWVzc2FnZUJ1c1Byb21pc2VNaWRkbGV3YXJlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7IE1lc3NhZ2VCdXNNaWRkbGV3YXJlSW50ZXJmYWNlIH0gZnJvbSAnLi9NZXNzYWdlQnVzTWlkZGxld2FyZUludGVyZmFjZSc7XG5cbi8qKlxuICogQSBtaWRkbGV3YXJlIHRvIGhhbmRsZSBQcm9taXNlcyBhbmQgc2NoZWR1bGUgdGhlIG1pZGRsZXdhcmUgZXhlY3V0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgTWVzc2FnZUJ1c1Byb21pc2VNaWRkbGV3YXJlIGltcGxlbWVudHMgTWVzc2FnZUJ1c01pZGRsZXdhcmVJbnRlcmZhY2Uge1xuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBuZXh0IG1pZGRsZXdhcmUgYnkgc2NoZWR1bGluZyB0aGUgZXhlY3V0aW9uXG4gICAqIHdpdGggYSBQcm9taXNlLlxuICAgKiBAcGFyYW0ge2FueX0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYW5kbGUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG5leHQgVGhlIG5leHQgbWlkZGxld2FyZSB0byBleGVjdXRlLlxuICAgKiBAcmV0dXJucyB7Qmx1ZWJpcmQ8VT59XG4gICAqL1xuICBoYW5kbGUobWVzc2FnZTogYW55LCBuZXh0OiBGdW5jdGlvbik6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIFByb21pc2UudHJ5KCgpID0+IG5leHQobWVzc2FnZSkpO1xuICB9XG5cbn1cbiJdfQ==
