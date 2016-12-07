"use strict";
/**
 * A MessageBus that allows to use middlewares.
 */
var MessageBusAllowMiddleware = (function () {
    /**
     * Creates a new MessageBus with the given set of middlewares.
     * @param {MessageBusMiddlewareInterface[]} _middlewares The middleware to use during the handling of messages.
     */
    function MessageBusAllowMiddleware(_middlewares) {
        if (_middlewares === void 0) { _middlewares = []; }
        this._middlewares = _middlewares;
    }
    Object.defineProperty(MessageBusAllowMiddleware.prototype, "middlewares", {
        /**
         * Gets the middlewares added to the bus.
         * @returns {MessageBusMiddlewareInterface[]}
         */
        get: function () {
            return this._middlewares;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Appends a new middleware.
     * @param {MessageBusMiddlewareInterface} middleware The middleware to add at the bottom.
     */
    MessageBusAllowMiddleware.prototype.appendMiddleware = function (middleware) {
        this._middlewares.push(middleware);
    };
    /**
     * Prepends a new middleware.
     * @param {MessageBusMiddlewareInterface} middleware The middleware to add at the top.
     */
    MessageBusAllowMiddleware.prototype.prependMiddleware = function (middleware) {
        this._middlewares.unshift(middleware);
    };
    /**
     * Creates the function for the next middleware.
     * @param {number} index The position of the middleware to create function for.
     * @returns {Function} The function to call to execute the middleware.
     * @private
     */
    MessageBusAllowMiddleware.prototype._functionForNextMiddleware = function (index) {
        var _this = this;
        if (!this._middlewares[index]) {
            return function () { };
        }
        var middleware = this._middlewares[index];
        return function (message) { return middleware.handle(message, _this._functionForNextMiddleware(index + 1)); };
    };
    /**
     * @inheritDoc
     */
    MessageBusAllowMiddleware.prototype.handle = function (message) {
        return this._functionForNextMiddleware(0)(message);
    };
    return MessageBusAllowMiddleware;
}());
exports.MessageBusAllowMiddleware = MessageBusAllowMiddleware;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9CdXMvTWVzc2FnZUJ1c0FsbG93TWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBSUE7O0dBRUc7QUFDSDtJQUVFOzs7T0FHRztJQUNILG1DQUFvQixZQUFrRDtRQUExRCw0QkFBMEQsR0FBMUQsaUJBQTBEO1FBQWxELGlCQUFZLEdBQVosWUFBWSxDQUFzQztJQUFHLENBQUM7SUFNMUUsc0JBQUksa0RBQVc7UUFKZjs7O1dBR0c7YUFDSDtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzNCLENBQUM7OztPQUFBO0lBRUQ7OztPQUdHO0lBQ0gsb0RBQWdCLEdBQWhCLFVBQWlCLFVBQXlDO1FBQ3hELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxxREFBaUIsR0FBakIsVUFBa0IsVUFBeUM7UUFDekQsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ssOERBQTBCLEdBQWxDLFVBQW1DLEtBQWE7UUFBaEQsaUJBUUM7UUFQQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxjQUFPLENBQUMsQ0FBQztRQUNsQixDQUFDO1FBRUQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUxQyxNQUFNLENBQUMsVUFBQyxPQUFZLElBQUssT0FBQSxVQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFJLENBQUMsMEJBQTBCLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQXRFLENBQXNFLENBQUM7SUFDbEcsQ0FBQztJQUVEOztPQUVHO0lBQ0gsMENBQU0sR0FBTixVQUFPLE9BQVk7UUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUgsZ0NBQUM7QUFBRCxDQXZEQSxBQXVEQyxJQUFBO0FBdkRZLGlDQUF5Qiw0QkF1RHJDLENBQUEiLCJmaWxlIjoiQnVzL01lc3NhZ2VCdXNBbGxvd01pZGRsZXdhcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IE1lc3NhZ2VCdXNJbnRlcmZhY2UgfSBmcm9tICcuL01lc3NhZ2VCdXNJbnRlcmZhY2UnO1xuaW1wb3J0IHsgTWVzc2FnZUJ1c01pZGRsZXdhcmVJbnRlcmZhY2UgfSBmcm9tICcuLi9NaWRkbGV3YXJlL01lc3NhZ2VCdXNNaWRkbGV3YXJlSW50ZXJmYWNlJztcblxuLyoqXG4gKiBBIE1lc3NhZ2VCdXMgdGhhdCBhbGxvd3MgdG8gdXNlIG1pZGRsZXdhcmVzLlxuICovXG5leHBvcnQgY2xhc3MgTWVzc2FnZUJ1c0FsbG93TWlkZGxld2FyZSBpbXBsZW1lbnRzIE1lc3NhZ2VCdXNJbnRlcmZhY2Uge1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IE1lc3NhZ2VCdXMgd2l0aCB0aGUgZ2l2ZW4gc2V0IG9mIG1pZGRsZXdhcmVzLlxuICAgKiBAcGFyYW0ge01lc3NhZ2VCdXNNaWRkbGV3YXJlSW50ZXJmYWNlW119IF9taWRkbGV3YXJlcyBUaGUgbWlkZGxld2FyZSB0byB1c2UgZHVyaW5nIHRoZSBoYW5kbGluZyBvZiBtZXNzYWdlcy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX21pZGRsZXdhcmVzOiBNZXNzYWdlQnVzTWlkZGxld2FyZUludGVyZmFjZVtdID0gW10pIHt9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIG1pZGRsZXdhcmVzIGFkZGVkIHRvIHRoZSBidXMuXG4gICAqIEByZXR1cm5zIHtNZXNzYWdlQnVzTWlkZGxld2FyZUludGVyZmFjZVtdfVxuICAgKi9cbiAgZ2V0IG1pZGRsZXdhcmVzKCk6IE1lc3NhZ2VCdXNNaWRkbGV3YXJlSW50ZXJmYWNlW10ge1xuICAgIHJldHVybiB0aGlzLl9taWRkbGV3YXJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBlbmRzIGEgbmV3IG1pZGRsZXdhcmUuXG4gICAqIEBwYXJhbSB7TWVzc2FnZUJ1c01pZGRsZXdhcmVJbnRlcmZhY2V9IG1pZGRsZXdhcmUgVGhlIG1pZGRsZXdhcmUgdG8gYWRkIGF0IHRoZSBib3R0b20uXG4gICAqL1xuICBhcHBlbmRNaWRkbGV3YXJlKG1pZGRsZXdhcmU6IE1lc3NhZ2VCdXNNaWRkbGV3YXJlSW50ZXJmYWNlKSB7XG4gICAgdGhpcy5fbWlkZGxld2FyZXMucHVzaChtaWRkbGV3YXJlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmVwZW5kcyBhIG5ldyBtaWRkbGV3YXJlLlxuICAgKiBAcGFyYW0ge01lc3NhZ2VCdXNNaWRkbGV3YXJlSW50ZXJmYWNlfSBtaWRkbGV3YXJlIFRoZSBtaWRkbGV3YXJlIHRvIGFkZCBhdCB0aGUgdG9wLlxuICAgKi9cbiAgcHJlcGVuZE1pZGRsZXdhcmUobWlkZGxld2FyZTogTWVzc2FnZUJ1c01pZGRsZXdhcmVJbnRlcmZhY2UpIHtcbiAgICB0aGlzLl9taWRkbGV3YXJlcy51bnNoaWZ0KG1pZGRsZXdhcmUpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIGZ1bmN0aW9uIGZvciB0aGUgbmV4dCBtaWRkbGV3YXJlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggVGhlIHBvc2l0aW9uIG9mIHRoZSBtaWRkbGV3YXJlIHRvIGNyZWF0ZSBmdW5jdGlvbiBmb3IuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgdG8gZXhlY3V0ZSB0aGUgbWlkZGxld2FyZS5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgX2Z1bmN0aW9uRm9yTmV4dE1pZGRsZXdhcmUoaW5kZXg6IG51bWJlcik6IEZ1bmN0aW9uIHtcbiAgICBpZiAoIXRoaXMuX21pZGRsZXdhcmVzW2luZGV4XSkge1xuICAgICAgcmV0dXJuICgpID0+IHt9O1xuICAgIH1cblxuICAgIGxldCBtaWRkbGV3YXJlID0gdGhpcy5fbWlkZGxld2FyZXNbaW5kZXhdO1xuXG4gICAgcmV0dXJuIChtZXNzYWdlOiBhbnkpID0+IG1pZGRsZXdhcmUuaGFuZGxlKG1lc3NhZ2UsIHRoaXMuX2Z1bmN0aW9uRm9yTmV4dE1pZGRsZXdhcmUoaW5kZXggKyAxKSk7XG4gIH1cblxuICAvKipcbiAgICogQGluaGVyaXREb2NcbiAgICovXG4gIGhhbmRsZShtZXNzYWdlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9mdW5jdGlvbkZvck5leHRNaWRkbGV3YXJlKDApKG1lc3NhZ2UpO1xuICB9XG5cbn1cbiJdfQ==
