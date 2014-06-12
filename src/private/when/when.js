_MOJO.When = (function() {


    function When() {}


    When.prototype = {

        when: function( eventType , handler , args ) {

            var that = this;

            if (!eventType || (!handler || typeof handler !== 'function')) {
                throw 'Error: Invalid when args.';
            }

            var eTypes = eventType.split( ' ' );

            eTypes.forEach(function( type ) {
                var _handler = new _MOJO.EventHandler( handler );
                _handler.bind( args );
                that._addHandler( type , _handler );
            });
        },

        happen: function( eventType , args ) {

            var that = this;
            var eTypes = eventType.split( ' ' );

            eTypes.forEach(function( type ) {

                var handlers = that._getHandlers( type );
                var event = _MOJO.EventFactory( that , type );

                handlers.forEach(function( handler ) {
                    handler.invoke( event , args );
                });
            });
        },

        dispel: function( eventType , handler ) {

            var that = this;
            var handlers = that._getHandlers();
            var eTypes = eventType.split( ' ' );

            eTypes.forEach(function( type ) {
                if (handler) {
                    that._removeHandler( type , handler );
                }
                else {
                    delete handlers[type];
                }
            });
        },

        _getHandlers: function( eventType ) {
            var handlers = this.handlers;
            return (eventType ? (handlers[eventType] || []) : handlers);
        },

        _addHandler: function( eventType , handler ) {
            var that = this;
            var handlers = that.handlers;
            (handlers[eventType] = handlers[eventType] || []).push( handler );
        },

        _removeHandler: function( eventType , handler ) {

            var that = this;
            var eventHandlers = that._getHandlers( eventType );
                
            if (!eventHandlers || eventHandlers.length < 1) {
                return;
            }

            var i = 0, _handler;

            while (i < eventHandlers.length) {
                _handler = eventHandlers[i].handler;
                if (_handler === handler) {
                    break;
                }
                i++;
            }

            if (i < 0 || i >= eventHandlers.length) {
                return;
            }

            eventHandlers = eventHandlers.splice( i , 1 );
        }
    };


    return When;

    
}());


























