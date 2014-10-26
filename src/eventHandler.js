define([] , function() {

    function EventHandler( func , context , bindArgs ) {

        var that = this;

        that.func = func;
        that.locked = false;
        that.before = function() {};
        that.after = function() {};

        bindArgs = $_ensureArray( bindArgs );

        that.invoke = function( event , invArgs ) {
            
            if (event.cancelBubble) {
                return;
            }

            var args = $_slice( bindArgs ).concat(
                $_ensureArray( invArgs )
            );

            args.unshift( event );
            that.before( event , func );
            func.apply( context , args );
            that.after( event , func );
        };
    }

    return EventHandler;
});



















