;'use strict';
var $                          = require('jquery'),
    _protoPublisherMixin       = {
	    _defaults : {
		    observerEvent : 'any'
	    },

	    subscribe : function ( event, action ) {
		    event = event || this._defaults.observerEvent;
		    if (typeof this.events[event] === 'undefined'){
			    this.events[event] = [];
		    }
		    this.events[event].push(action);
	    },

	    unsubscribe : function ( event, action ) {
		    this._visitSubscribers('unsubscribe', event, action);
	    },

	    trigger : function ( event, args ) {
		    this._visitSubscribers('trigger', event, null, args);
	    },

	    _visitSubscribers : function ( type, event, action, args ) {
		    event           = event || this._defaults.observerEvent;
		    var subscribers = this.events[event];
		    if (subscribers === undefined){
			    //console.log(subscribers);
			    return;
		    }

		    for ( var i = subscribers.length - 1; i >= 0; i-- ) {
			    switch ( type ) {
				    case 'trigger':
					    subscribers[i](args);
					    break;
				    case 'unsubscribe':
					    if (subscribers[i] === action){
						    subscribers.splice(i, 1);
					    }
					    break;
				    default:
					    break;
			    }
		    }
	    }
    },
    _constructorPublisherMixin = {
	    events : {
		    any : [] // тип события: подписчики
	    }
    };

function Observer( settings ) {
	this.settings = $.extend(true, {}, this._settings, settings);
	$.extend(true, this, _constructorPublisherMixin);
}

Observer.prototype = {
	_settings : {},
	_defaults : {}
};
$.extend(true, Observer.prototype, _protoPublisherMixin);

Observer.mixObserverTo = function ( obj ) {
	$.extend(true, obj, _protoPublisherMixin, _constructorPublisherMixin);
};

module.exports = Observer;