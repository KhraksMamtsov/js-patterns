"use strict";
let mementosSymbol = Symbol('mementos'),
    _cMx           = {
	    [mementosSymbol] : {}
    },
    _pMx           = {
	    hydrate( mementoId ) {
		    if (!this[mementosSymbol][mementoId]){
			    Object.assign(this[mementosSymbol][mementoId] = {}, this);
		    }
		    console.log(this[mementosSymbol]);
	    },
	    dehydrate( mementoId ) {
		    Object.assign(this, this[mementosSymbol][mementoId]);
	    }
    };

class Memento {
	constructor() {
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
Object.assign(Memento.prototype, _pMx);

class Person {
	constructor( name ) {
		this.name = name;
	}

	sayHi() {
		console.log('Person: ' + this.name);
		return this.name;
	}
}
class Citizen extends Memento.mixToClass(Person) {
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

var asd = new Citizen('Max', 'Che');
var qwe = new Citizen('Elena', 'Ekat');
console.log(asd);
asd.sayHi();
console.log(asd instanceof Person);
asd.hydrate('asd');
qwe.hydrate('qwe');
console.log(qwe);
qwe.name = '123';
console.log(qwe);
qwe.hydrate('zxc');
qwe.dehydrate('qwe');

console.log(qwe);