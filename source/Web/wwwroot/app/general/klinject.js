(function() {
    function isFunction(value) {
        var getType = {};
        return value && getType.toString.call(value) === '[object Function]';
    }

    var Registration = function(constructorOrInstance, injector) {
        this._constructor = constructorOrInstance;
        this._injector = injector;
    };
    Registration.prototype.get = function() {
        return this.create();
    };
    Registration.prototype.create = function() {
        var argsRegex = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
        var functionString = this._constructor.toString();
        var argNames = functionString.match(argsRegex)[1].replace(/ /g, '').split('');

        var args = [];
        for (var i = 0; i < argNames.length; i++) {
            var instance = this._injector.get(argNames[i]);
            args.push(instance);
        }
        return Object.create(this._constructor, args);
    };

    var Singleton = function (constructorOrInstance, injector) {
        Registration.call(this, constructorOrInstance, injector);

        if (!isFunction(constructorOrInstance))
            this._instance = constructorOrInstance;
    };
    Singleton.prototype.get = function() {
        if (this._instance !== undefined)
            return this._instance;

        this._instance = this.create();
        return this._instance;
    };

    var Injector = function () {
        this._registrations = {};
    };
    Injector.prototype.get = function(name) {
        if (!this._registrations.hasOwnProperty(name))
            throw 'Nothing has been registered with name "' + name + '"';

        return this._registrations[name].get();
    };
    Injector.prototype.addTransient = function(name, constructor) {
        if (this._registrations.hasOwnProperty(name))
            throw 'The name "' + name + '" has already been registered';

        this._registrations[name] = new Registration(constructor, this);
    };
    Injector.prototype.addSingleton = function(name, constructorOrInstance) {
        if (this._registrations.hasOwnProperty(name))
            throw 'The name "' + name + '" has already been registered';

        this._registrations[name] = new Singleton(constructorOrInstance, this);
    };

    window.klinject = window.klinject || {};
    window.klinject.instance = new Injector();
})();