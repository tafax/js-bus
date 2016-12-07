"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CallableResolverError = (function (_super) {
    __extends(CallableResolverError, _super);
    function CallableResolverError(_identifier) {
        _super.call(this, "Unable to find callable for " + _identifier);
        this._identifier = _identifier;
    }
    Object.defineProperty(CallableResolverError.prototype, "identifier", {
        get: function () {
            return this._identifier;
        },
        enumerable: true,
        configurable: true
    });
    return CallableResolverError;
}(Error));
exports.CallableResolverError = CallableResolverError;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DYWxsYWJsZVJlc29sdmVyL0Vycm9ycy9DYWxsYWJsZVJlc29sdmVyRXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0E7SUFBMkMseUNBQUs7SUFDOUMsK0JBQW9CLFdBQWdCO1FBQ2xDLGtCQUFNLGlDQUErQixXQUFhLENBQUMsQ0FBQztRQURsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBSztJQUVwQyxDQUFDO0lBRUQsc0JBQUksNkNBQVU7YUFBZDtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzFCLENBQUM7OztPQUFBO0lBQ0gsNEJBQUM7QUFBRCxDQVJBLEFBUUMsQ0FSMEMsS0FBSyxHQVEvQztBQVJZLDZCQUFxQix3QkFRakMsQ0FBQSIsImZpbGUiOiJDYWxsYWJsZVJlc29sdmVyL0Vycm9ycy9DYWxsYWJsZVJlc29sdmVyRXJyb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCBjbGFzcyBDYWxsYWJsZVJlc29sdmVyRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2lkZW50aWZpZXI6IGFueSkge1xuICAgIHN1cGVyKGBVbmFibGUgdG8gZmluZCBjYWxsYWJsZSBmb3IgJHtfaWRlbnRpZmllcn1gKTtcbiAgfVxuXG4gIGdldCBpZGVudGlmaWVyKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2lkZW50aWZpZXI7XG4gIH1cbn1cbiJdfQ==
