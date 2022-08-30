"use strict";
var Person = function ( name, street, city, state ) {
	this.name   = name;
	this.street = street;
	this.city   = city;
	this.state  = state;
};

Person.prototype = {
	hydrate   : function ( mementId ) {
		if (!this._mementos){
			Object.defineProperty(this, '_mementos', { value : {} });
		}
		if (!this._mementos[mementId]){
			this._mementos[mementId] = {};
			for ( var prop in this ) {
				if (this.hasOwnProperty(prop)){
					this._mementos[mementId][prop] = this[prop];
				}
			}
			//this._mementos[id] = JSON.stringify(this);
		}
		console.log(this._mementos);
	},
	dehydrate : function ( mementoId ) {
		//var m = JSON.parse(this._mementos[mementoId]);
		var m = this._mementos[mementoId];
		for ( var prop in m ) {
			this[prop] = m[prop];
		}
	},
	foo       : function () {
		console.log('foo');
	}
};
var asd          = new Person(1, 2, 3, 4);
var qwe          = new Person(5, 6, 7, 8);

asd.hydrate('asd');
qwe.hydrate('qwe');
console.log(qwe);
qwe.name = '123';
console.log(qwe);
qwe.hydrate('zxc');
qwe.dehydrate('qwe');
console.log(qwe);