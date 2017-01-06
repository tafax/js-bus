"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Bluebird = require('bluebird');
var rxjs_1 = require('rxjs');
var AbstractDelegatesToMessageHandlerMiddleware_1 = require('./AbstractDelegatesToMessageHandlerMiddleware');
/**
 * @inheritDoc
 */
var ObservableDelegatesMessageHandlerMiddleware = (function (_super) {
    __extends(ObservableDelegatesMessageHandlerMiddleware, _super);
    function ObservableDelegatesMessageHandlerMiddleware() {
        _super.apply(this, arguments);
    }
    /**
     * Wraps up a value with an observable. If needed.
     * @param {any} value The value to wrap up.
     * @returns {any} The observable value.
     * @private
     */
    ObservableDelegatesMessageHandlerMiddleware.prototype._wrapWithObservable = function (value) {
        if (value instanceof rxjs_1.Observable) {
            return value;
        }
        if ((value instanceof Promise) || value instanceof Bluebird) {
            return rxjs_1.Observable.fromPromise(value);
        }
        return rxjs_1.Observable.of(value);
    };
    /**
     * @inheritDoc
     */
    ObservableDelegatesMessageHandlerMiddleware.prototype.handle = function (message, next) {
        var _this = this;
        // It wraps the message with an observable.
        return this._wrapWithObservable(message)
            .map(function (message) { return _this._messageHandlerResolver.getHandler(message); })
            .flatMap(function (handler) { return _this._wrapWithObservable(handler(message)); })
            .do(function () { return _this._wrapWithObservable(next(message)); });
    };
    return ObservableDelegatesMessageHandlerMiddleware;
}(AbstractDelegatesToMessageHandlerMiddleware_1.AbstractDelegatesToMessageHandlerMiddleware));
exports.ObservableDelegatesMessageHandlerMiddleware = ObservableDelegatesMessageHandlerMiddleware;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9IYW5kbGVyL09ic2VydmFibGVEZWxlZ2F0ZXNNZXNzYWdlSGFuZGxlck1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBWSxRQUFRLFdBQU0sVUFBVSxDQUFDLENBQUE7QUFFckMscUJBQTJCLE1BQU0sQ0FBQyxDQUFBO0FBQ2xDLDREQUE0RCwrQ0FBK0MsQ0FBQyxDQUFBO0FBRTVHOztHQUVHO0FBQ0g7SUFBaUUsK0RBQTJDO0lBQTVHO1FBQWlFLDhCQUEyQztJQWtDNUcsQ0FBQztJQWhDQzs7Ozs7T0FLRztJQUNLLHlFQUFtQixHQUEzQixVQUE0QixLQUFVO1FBQ3BDLEVBQUUsQ0FBQyxDQUFDLEtBQUssWUFBWSxpQkFBVSxDQUFDLENBQUMsQ0FBQztZQUNoQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxZQUFZLE9BQU8sQ0FBQyxJQUFJLEtBQUssWUFBWSxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzVELE1BQU0sQ0FBQyxpQkFBVSxDQUFDLFdBQVcsQ0FBQyxLQUFxQixDQUFDLENBQUM7UUFDdkQsQ0FBQztRQUVELE1BQU0sQ0FBQyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQ7O09BRUc7SUFDSCw0REFBTSxHQUFOLFVBQU8sT0FBWSxFQUFFLElBQWM7UUFBbkMsaUJBVUM7UUFUQywyQ0FBMkM7UUFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUM7YUFLckMsR0FBRyxDQUFDLFVBQUMsT0FBWSxJQUFLLE9BQUEsS0FBSSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBaEQsQ0FBZ0QsQ0FBQzthQUN2RSxPQUFPLENBQUMsVUFBQyxPQUFpQixJQUFLLE9BQUEsS0FBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUExQyxDQUEwQyxDQUFDO2FBQzFFLEVBQUUsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUF2QyxDQUF1QyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUNILGtEQUFDO0FBQUQsQ0FsQ0EsQUFrQ0MsQ0FsQ2dFLHlGQUEyQyxHQWtDM0c7QUFsQ1ksbURBQTJDLDhDQWtDdkQsQ0FBQSIsImZpbGUiOiJIYW5kbGVyL09ic2VydmFibGVEZWxlZ2F0ZXNNZXNzYWdlSGFuZGxlck1pZGRsZXdhcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIEJsdWViaXJkIGZyb20gJ2JsdWViaXJkJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQWJzdHJhY3REZWxlZ2F0ZXNUb01lc3NhZ2VIYW5kbGVyTWlkZGxld2FyZSB9IGZyb20gJy4vQWJzdHJhY3REZWxlZ2F0ZXNUb01lc3NhZ2VIYW5kbGVyTWlkZGxld2FyZSc7XG5cbi8qKlxuICogQGluaGVyaXREb2NcbiAqL1xuZXhwb3J0IGNsYXNzIE9ic2VydmFibGVEZWxlZ2F0ZXNNZXNzYWdlSGFuZGxlck1pZGRsZXdhcmUgZXh0ZW5kcyBBYnN0cmFjdERlbGVnYXRlc1RvTWVzc2FnZUhhbmRsZXJNaWRkbGV3YXJlIHtcblxuICAvKipcbiAgICogV3JhcHMgdXAgYSB2YWx1ZSB3aXRoIGFuIG9ic2VydmFibGUuIElmIG5lZWRlZC5cbiAgICogQHBhcmFtIHthbnl9IHZhbHVlIFRoZSB2YWx1ZSB0byB3cmFwIHVwLlxuICAgKiBAcmV0dXJucyB7YW55fSBUaGUgb2JzZXJ2YWJsZSB2YWx1ZS5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgX3dyYXBXaXRoT2JzZXJ2YWJsZSh2YWx1ZTogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgaWYgKCh2YWx1ZSBpbnN0YW5jZW9mIFByb21pc2UpIHx8IHZhbHVlIGluc3RhbmNlb2YgQmx1ZWJpcmQpIHtcbiAgICAgIHJldHVybiBPYnNlcnZhYmxlLmZyb21Qcm9taXNlKHZhbHVlIGFzIFByb21pc2U8YW55Pik7XG4gICAgfVxuXG4gICAgcmV0dXJuIE9ic2VydmFibGUub2YodmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBpbmhlcml0RG9jXG4gICAqL1xuICBoYW5kbGUobWVzc2FnZTogYW55LCBuZXh0OiBGdW5jdGlvbik6IGFueSB7XG4gICAgLy8gSXQgd3JhcHMgdGhlIG1lc3NhZ2Ugd2l0aCBhbiBvYnNlcnZhYmxlLlxuICAgIHJldHVybiB0aGlzLl93cmFwV2l0aE9ic2VydmFibGUobWVzc2FnZSlcbiAgICAgIC8qKlxuICAgICAgICogUmVzb2x2ZXMgdGhlIGhhbmRsZXIgYmFzZWQgb24gdGhlIHNwZWNpZmllZCByZXNvbHZlci5cbiAgICAgICAqIFdyYXBzIHRoZSBoYW5kbGVyIGludG8gYW4gb2JzZXJ2YWJsZSB0byBiZSBzdXJlIHRvIHJlc3BlY3QgdGhlIGNoYWluLlxuICAgICAgICovXG4gICAgICAubWFwKChtZXNzYWdlOiBhbnkpID0+IHRoaXMuX21lc3NhZ2VIYW5kbGVyUmVzb2x2ZXIuZ2V0SGFuZGxlcihtZXNzYWdlKSlcbiAgICAgIC5mbGF0TWFwKChoYW5kbGVyOiBGdW5jdGlvbikgPT4gdGhpcy5fd3JhcFdpdGhPYnNlcnZhYmxlKGhhbmRsZXIobWVzc2FnZSkpKVxuICAgICAgLmRvKCgpID0+IHRoaXMuX3dyYXBXaXRoT2JzZXJ2YWJsZShuZXh0KG1lc3NhZ2UpKSk7XG4gIH1cbn1cbiJdfQ==
