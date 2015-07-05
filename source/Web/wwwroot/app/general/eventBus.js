(function(angular) {
    var Subscriber = function(event, callback) {
        this._event = event;
        this._callback = callback;
    };

    Subscriber.prototype.handles = function(event) {
        return this._event === event;
    };

    Subscriber.prototype.handle = function(args) {
        this._callback(args);
    };

    var EventBus = function() {
        this._subscribers = [];
    };

    EventBus.prototype.subscribe = function(event, callback) {
        var subscriber = new Subscriber(event, callback);
        this._subscribers.push(subscriber);
    };

    EventBus.prototype.publish = function(event, args) {
        var count = this._subscribers.length;
        for (var i = 0; i < count; i++) {
            var subscriber = this._subscribers[i];
            if (subscriber.handles(event)) {
                subscriber.handle(args);
            }
        }
    };

    var instance = undefined;
    angular.module('movies').factory('eventBus', function() {
        if (instance === undefined)
            instance = new EventBus();
        return instance;
    });
})(angular = window.angular || {});