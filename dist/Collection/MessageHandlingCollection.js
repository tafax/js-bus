"use strict";
var _ = require('lodash');
/**
 * Defines a collection of the message/handler pairs.
 * It just offers a convenience interface to store and retrieve
 * collection objects.
 *
 * TODO: Handles the duplications. How to handle same message different handlers?
 */
var MessageHandlingCollection = (function () {
    /**
     * Creates a new MessageHandlingCollection.
     * @param {MessageHandlerPair[]} [_collection] The initial collection.
     */
    function MessageHandlingCollection(_collection) {
        this._collection = _collection;
    }
    /**
     * Sets a collection. It will override the old one.
     * @param {MessageHandlerPair[]} collection The new collection.
     */
    MessageHandlingCollection.prototype.setCollection = function (collection) {
        this._collection = collection;
    };
    /**
     * Gets a handler given a specific message.
     * @param {any} message The message used as key.
     * @returns {any} The handler found.
     */
    MessageHandlingCollection.prototype.getHandler = function (message) {
        return _.get(_.find(this._collection, { message: message }), 'handler');
    };
    /**
     * Gets a message given a specific handler.
     * @param {any} handler The handler used as key.
     * @returns {any} The message found.
     */
    MessageHandlingCollection.prototype.getMessage = function (handler) {
        return _.get(_.find(this._collection, { handler: handler }), 'message');
    };
    return MessageHandlingCollection;
}());
exports.MessageHandlingCollection = MessageHandlingCollection;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Db2xsZWN0aW9uL01lc3NhZ2VIYW5kbGluZ0NvbGxlY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBSzVCOzs7Ozs7R0FNRztBQUNIO0lBRUU7OztPQUdHO0lBQ0gsbUNBQW9CLFdBQWtDO1FBQWxDLGdCQUFXLEdBQVgsV0FBVyxDQUF1QjtJQUFHLENBQUM7SUFFMUQ7OztPQUdHO0lBQ0gsaURBQWEsR0FBYixVQUFjLFVBQWdDO1FBQzVDLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsOENBQVUsR0FBVixVQUFXLE9BQVk7UUFDckIsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCw4Q0FBVSxHQUFWLFVBQVcsT0FBWTtRQUNyQixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBQ0gsZ0NBQUM7QUFBRCxDQWpDQSxBQWlDQyxJQUFBO0FBakNZLGlDQUF5Qiw0QkFpQ3JDLENBQUEiLCJmaWxlIjoiQ29sbGVjdGlvbi9NZXNzYWdlSGFuZGxpbmdDb2xsZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbi8vIERlZmluZXMgYSBjb252ZW5pZW5jZSB0eXBlIHRvIGRlc2NyaWJlIHRoZSBtZXNzYWdlL2hhbmRsZXIgcGFpci5cbmV4cG9ydCBkZWNsYXJlIHR5cGUgTWVzc2FnZUhhbmRsZXJQYWlyID0geyBtZXNzYWdlOiBhbnksIGhhbmRsZXI6IGFueSB9O1xuXG4vKipcbiAqIERlZmluZXMgYSBjb2xsZWN0aW9uIG9mIHRoZSBtZXNzYWdlL2hhbmRsZXIgcGFpcnMuXG4gKiBJdCBqdXN0IG9mZmVycyBhIGNvbnZlbmllbmNlIGludGVyZmFjZSB0byBzdG9yZSBhbmQgcmV0cmlldmVcbiAqIGNvbGxlY3Rpb24gb2JqZWN0cy5cbiAqXG4gKiBUT0RPOiBIYW5kbGVzIHRoZSBkdXBsaWNhdGlvbnMuIEhvdyB0byBoYW5kbGUgc2FtZSBtZXNzYWdlIGRpZmZlcmVudCBoYW5kbGVycz9cbiAqL1xuZXhwb3J0IGNsYXNzIE1lc3NhZ2VIYW5kbGluZ0NvbGxlY3Rpb24ge1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IE1lc3NhZ2VIYW5kbGluZ0NvbGxlY3Rpb24uXG4gICAqIEBwYXJhbSB7TWVzc2FnZUhhbmRsZXJQYWlyW119IFtfY29sbGVjdGlvbl0gVGhlIGluaXRpYWwgY29sbGVjdGlvbi5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NvbGxlY3Rpb24/OiBNZXNzYWdlSGFuZGxlclBhaXJbXSkge31cblxuICAvKipcbiAgICogU2V0cyBhIGNvbGxlY3Rpb24uIEl0IHdpbGwgb3ZlcnJpZGUgdGhlIG9sZCBvbmUuXG4gICAqIEBwYXJhbSB7TWVzc2FnZUhhbmRsZXJQYWlyW119IGNvbGxlY3Rpb24gVGhlIG5ldyBjb2xsZWN0aW9uLlxuICAgKi9cbiAgc2V0Q29sbGVjdGlvbihjb2xsZWN0aW9uOiBNZXNzYWdlSGFuZGxlclBhaXJbXSkge1xuICAgIHRoaXMuX2NvbGxlY3Rpb24gPSBjb2xsZWN0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYSBoYW5kbGVyIGdpdmVuIGEgc3BlY2lmaWMgbWVzc2FnZS5cbiAgICogQHBhcmFtIHthbnl9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdXNlZCBhcyBrZXkuXG4gICAqIEByZXR1cm5zIHthbnl9IFRoZSBoYW5kbGVyIGZvdW5kLlxuICAgKi9cbiAgZ2V0SGFuZGxlcihtZXNzYWdlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBfLmdldChfLmZpbmQodGhpcy5fY29sbGVjdGlvbiwgeyBtZXNzYWdlOiBtZXNzYWdlIH0pLCAnaGFuZGxlcicpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYSBtZXNzYWdlIGdpdmVuIGEgc3BlY2lmaWMgaGFuZGxlci5cbiAgICogQHBhcmFtIHthbnl9IGhhbmRsZXIgVGhlIGhhbmRsZXIgdXNlZCBhcyBrZXkuXG4gICAqIEByZXR1cm5zIHthbnl9IFRoZSBtZXNzYWdlIGZvdW5kLlxuICAgKi9cbiAgZ2V0TWVzc2FnZShoYW5kbGVyOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBfLmdldChfLmZpbmQodGhpcy5fY29sbGVjdGlvbiwgeyBoYW5kbGVyOiBoYW5kbGVyIH0pLCAnbWVzc2FnZScpO1xuICB9XG59XG4iXX0=
