(function(Polymer) {

    'use strict';

    var Dispatcher = Polymer({

        is: 'steroid-polyglue',
        _prefix: 'ID_',
        created: function() {
            this._lastID = 1;
            this._callbacks = {};
            this._isPending = {};
            this._isHandled = {};
            this._isDispatching = false;
            this._pendingPayload = null;
        },
        /**
         * Registers a callback to be invoked with every dispatched payload. Returns
         * a token that can be used with `waitFor()`.
         *
         * @param {function} callback
         * @return {string}
         */
        register: function(/*id,callback*/) {

            var args = [];

            for (var i = arguments.length - 1; i >= 0; i--) {
                args.push(arguments[i]);
            };

            if(args.length > 1){

                var id = args[1];
                this._callbacks[id] = args[0];
                return id;

            }else{

                var id = this._prefix + this._lastID++;
                this._callbacks[id] = args[0];
                return id;
            }
        },
        /**
         * Removes a callback based on its token.
         *
         * @param {string} id
         */
        unregister: function(id) {
            delete this._callbacks[id];
        },
        /**
         * Waits for the callbacks specified to be invoked before continuing execution
         * of the current callback. This method should only be used by a callback in
         * response to a dispatched payload.
         *
         * @param {array<string>} ids
         */
        waitFor: function(ids) {

            for (var ii = 0; ii < ids.length; ii++) {
                var id = ids[ii];
                if (this._isPending[id]) {

                    continue;
                }

                this._invokeCallback(id);
            }
        },
        /**
         * Dispatches a payload to all registered callbacks.
         *
         * @param {object} payload
         */
        dispatch: function(payload) {

            this._startDispatching(payload);
            try {
                for (var id in this._callbacks) {
                    if (this._isPending[id]) {
                        continue;
                    }
                    this._invokeCallback(id);
                }
            } finally {
                this._stopDispatching();
            }
        },

        /**
         * Dispatches a payload to one registered callback.
         *
         * @param  {String} id     registered callback's name
         * @param  {Object} payload Payload object to send
         */
        dispatchOne: function(id,name,target,from,data) {

            var payload = {};

            payload.name    =       name || "";
            payload.target  =       target || "";
            payload.from    =       from || "";
            payload.data    =       data || "";

            this._startDispatching(payload);

            try {

                this._invokeCallback(id);

            } finally {

                this._stopDispatching();
            }
        },

        /**
         * Is this Dispatcher currently dispatching.
         *
         * @return {boolean}
         */
        isDispatching: function() {
            return this._isDispatching;
        },

        /**
         * Call the callback stored with the given id. Also do some internal
         * bookkeeping.
         *
         * @param {string} id
         * @internal
         */
        _invokeCallback: function(id) {
            this._isPending[id] = true;
            this._callbacks[id](this._pendingPayload);
            this._isHandled[id] = true;
        },

        /**
         * Set up bookkeeping needed when dispatching.
         *
         * @param {object} payload
         * @internal
         */
        _startDispatching: function(payload) {
            for (var id in this._callbacks) {
                this._isPending[id] = false;
                this._isHandled[id] = false;
            }
            this._pendingPayload = payload;
            this._isDispatching = true;
        },

        /**
         * Clear bookkeeping used for dispatching.
         *
         * @internal
         */
        _stopDispatching: function() {
            this._pendingPayload = null;
            this._isDispatching = false;
        }


    });

})(Polymer);
