"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Promise = require('bluebird');
var AbstractDelegatesToMessageHandlerMiddleware_1 = require('./AbstractDelegatesToMessageHandlerMiddleware');
/**
 * Allows to handle a message using a specific handler function.
 *
 * Its purpose is to provide the ability to handle the message and
 * propagate the message itself to the next middleware. It doesn't handle
 * errors.
 */
var PromiseDelegatesMessageHandlerMiddleware = (function (_super) {
    __extends(PromiseDelegatesMessageHandlerMiddleware, _super);
    function PromiseDelegatesMessageHandlerMiddleware() {
        _super.apply(this, arguments);
    }
    /**
     * Handles the message and propagate it to the next middleware.
     * @param {any} message The message to handle.
     * @param {Function} next The next middleware function.
     * @return {Promise<any>}
     */
    PromiseDelegatesMessageHandlerMiddleware.prototype.handle = function (message, next) {
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
                .then(function (result) { return [message, next, result]; });
        })
            .spread(function (message, next, result) {
            return Promise.resolve(result)
                .tap(function () { return next(message); })
                .then(function () { return result; });
        });
    };
    return PromiseDelegatesMessageHandlerMiddleware;
}(AbstractDelegatesToMessageHandlerMiddleware_1.AbstractDelegatesToMessageHandlerMiddleware));
exports.PromiseDelegatesMessageHandlerMiddleware = PromiseDelegatesMessageHandlerMiddleware;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9IYW5kbGVyL1Byb21pc2VEZWxlZ2F0ZXNNZXNzYWdlSGFuZGxlck1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBWSxPQUFPLFdBQU0sVUFBVSxDQUFDLENBQUE7QUFDcEMsNERBQTRELCtDQUErQyxDQUFDLENBQUE7QUFFNUc7Ozs7OztHQU1HO0FBQ0g7SUFBOEQsNERBQTJDO0lBQXpHO1FBQThELDhCQUEyQztJQTBCekcsQ0FBQztJQXpCQzs7Ozs7T0FLRztJQUNILHlEQUFNLEdBQU4sVUFBTyxPQUFZLEVBQUUsSUFBYztRQUFuQyxpQkFrQkM7UUFqQkMsK0NBQStDO1FBQy9DLGtDQUFrQztRQUNsQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNwQyxNQUFNLENBQUMsVUFBQyxPQUFZLEVBQUUsSUFBYztZQUNuQyx3REFBd0Q7WUFDeEQsSUFBSSxPQUFPLEdBQUcsS0FBSSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMvRCx5REFBeUQ7WUFDekQsYUFBYTtZQUNiLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQWhCLENBQWdCLENBQUM7aUJBQ3ZDLElBQUksQ0FBQyxVQUFDLE1BQVcsSUFBSyxPQUFBLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDO1FBQ3BELENBQUMsQ0FBQzthQUVELE1BQU0sQ0FBQyxVQUFDLE9BQVksRUFBRSxJQUFjLEVBQUUsTUFBVztZQUNoRCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7aUJBQzNCLEdBQUcsQ0FBQyxjQUFNLE9BQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFiLENBQWEsQ0FBQztpQkFDeEIsSUFBSSxDQUFDLGNBQU0sT0FBQSxNQUFNLEVBQU4sQ0FBTSxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0gsK0NBQUM7QUFBRCxDQTFCQSxBQTBCQyxDQTFCNkQseUZBQTJDLEdBMEJ4RztBQTFCWSxnREFBd0MsMkNBMEJwRCxDQUFBIiwiZmlsZSI6IkhhbmRsZXIvUHJvbWlzZURlbGVnYXRlc01lc3NhZ2VIYW5kbGVyTWlkZGxld2FyZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0ICogYXMgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgeyBBYnN0cmFjdERlbGVnYXRlc1RvTWVzc2FnZUhhbmRsZXJNaWRkbGV3YXJlIH0gZnJvbSAnLi9BYnN0cmFjdERlbGVnYXRlc1RvTWVzc2FnZUhhbmRsZXJNaWRkbGV3YXJlJztcblxuLyoqXG4gKiBBbGxvd3MgdG8gaGFuZGxlIGEgbWVzc2FnZSB1c2luZyBhIHNwZWNpZmljIGhhbmRsZXIgZnVuY3Rpb24uXG4gKlxuICogSXRzIHB1cnBvc2UgaXMgdG8gcHJvdmlkZSB0aGUgYWJpbGl0eSB0byBoYW5kbGUgdGhlIG1lc3NhZ2UgYW5kXG4gKiBwcm9wYWdhdGUgdGhlIG1lc3NhZ2UgaXRzZWxmIHRvIHRoZSBuZXh0IG1pZGRsZXdhcmUuIEl0IGRvZXNuJ3QgaGFuZGxlXG4gKiBlcnJvcnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBQcm9taXNlRGVsZWdhdGVzTWVzc2FnZUhhbmRsZXJNaWRkbGV3YXJlIGV4dGVuZHMgQWJzdHJhY3REZWxlZ2F0ZXNUb01lc3NhZ2VIYW5kbGVyTWlkZGxld2FyZSB7XG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBtZXNzYWdlIGFuZCBwcm9wYWdhdGUgaXQgdG8gdGhlIG5leHQgbWlkZGxld2FyZS5cbiAgICogQHBhcmFtIHthbnl9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFuZGxlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBuZXh0IFRoZSBuZXh0IG1pZGRsZXdhcmUgZnVuY3Rpb24uXG4gICAqIEByZXR1cm4ge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIGhhbmRsZShtZXNzYWdlOiBhbnksIG5leHQ6IEZ1bmN0aW9uKTogYW55IHtcbiAgICAvLyBJdCByZXNvbHZlcyBpbW1lZGlhdGVseSB0aGUgcHJvbWlzZSB0byBhbGxvd1xuICAgIC8vIHRoZSBjaGFpbiB0byBkZWFsbG9jIHJlc291cmNlcy5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFttZXNzYWdlLCBuZXh0XSlcbiAgICAgIC5zcHJlYWQoKG1lc3NhZ2U6IGFueSwgbmV4dDogRnVuY3Rpb24pID0+IHtcbiAgICAgICAgLy8gUmVzb2x2ZXMgdGhlIGhhbmRsZXIgYmFzZWQgb24gdGhlIHNwZWNpZmllZCByZXNvbHZlci5cbiAgICAgICAgbGV0IGhhbmRsZXIgPSB0aGlzLl9tZXNzYWdlSGFuZGxlclJlc29sdmVyLmdldEhhbmRsZXIobWVzc2FnZSk7XG4gICAgICAgIC8vIFdyYXBzIHRoZSBoYW5kbGVyIGludG8gYSBwcm9taXNlIHRvIGJlIHN1cmUgdG8gcmVzcGVjdFxuICAgICAgICAvLyB0aGUgY2hhaW4uXG4gICAgICAgIHJldHVybiBQcm9taXNlLnRyeSgoKSA9PiBoYW5kbGVyKG1lc3NhZ2UpKVxuICAgICAgICAgIC50aGVuKChyZXN1bHQ6IGFueSkgPT4gW21lc3NhZ2UsIG5leHQsIHJlc3VsdF0pO1xuICAgICAgfSlcbiAgICAgIC8vIENhbGxzIHRoZSBuZXh0IG1pZGRsZXdhcmUgZnVuY3Rpb24uXG4gICAgICAuc3ByZWFkKChtZXNzYWdlOiBhbnksIG5leHQ6IEZ1bmN0aW9uLCByZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3VsdClcbiAgICAgICAgICAudGFwKCgpID0+IG5leHQobWVzc2FnZSkpXG4gICAgICAgICAgLnRoZW4oKCkgPT4gcmVzdWx0KTtcbiAgICAgIH0pO1xuICB9XG59XG4iXX0=
