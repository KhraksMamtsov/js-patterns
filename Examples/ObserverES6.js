;'use strict';
let obsEvents        = Symbol('obsEvents'),
    obsDefaults      = Symbol('obsDefaults'),
    visitSubscribers = Symbol('visitSubscribers'),
    _cMx             = {
	    [obsEvents] : {
		    any : [] // тип события: подписчики
	    }
    },
    _pMx             = {
	    [obsDefaults] : {
		    observerEvent : 'any'
	    },
	    [visitSubscribers]( type, event = this[obsDefaults].observerEvent, action, args ) {
		    let subscribers = this[obsEvents][event];
		    if (subscribers === undefined){
			    return;
		    }

		    for ( let i = subscribers.length - 1; i >= 0; i-- ) {

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
	    },
	    subscribe ( event = this[obsDefaults].observerEvent, action ) {
		    if (typeof this[obsEvents][event] === undefined){
			    this[obsEvents][event] = [];
		    }
		    this[obsEvents][event].push(action);
	    },
	    unsubscribe( event, action ) {
		    this[visitSubscribers]('unsubscribe', event, action);
	    },
	    trigger( event, args ) {
		    this[visitSubscribers]('trigger', event, null, args);
	    }
    };

class Observer {
	constructor( settings ) {
		Object.assign(this, _cMx);
	}

	static mixToObject( obj ) {
		Object.assign(obj, _cMx, _pMx);
	}

	static mixToClass( superclass ) {
		class Intermediate extends superclass {
			constructor() {
				super(...arguments);
				Object.assign(this, _cMx);
			}
		}
		Object.assign(Intermediate.prototype, _pMx);
		return Intermediate;
	}
}
Object.assign(Observer.prototype, _pMx);

class Person {
	constructor( name ) {
		this.name = name;
	}

	sayHi() {
		console.log('Person: ' + this.name);
		return this.name;
	}
}
class Citizen extends Observer.mixToClass(Person) {
	constructor( name, city, ) {
		super(name);
		this.city = city;
	};

	sayHi() {
		let name = super.sayHi();
		console.log(`Citizen: ${name}, ${this.city}`);
		return this.city;
	}
}
let person = new Citizen('Max', 'Che');
console.log(person);
let obs = new Observer();
console.log(obs);