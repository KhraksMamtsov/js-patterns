'use strict';
let Singleton = null;
{
	let instances   = {},
	    SingletonID = Symbol('SingletonID');
	Singleton       = class {
		constructor( { foo:q = 'default_foo', bar:a = 'default_bar' }, symbol = SingletonID ) {
			if (!instances[symbol]){
				instances[symbol] = this;
			}
			this.props = {
				[a]                               : a,
				[`Hello ${q}, how are you ${a}?`] : q
			};
			this.m     = 'method';
			return instances[symbol];
		}

		name() {
			return this.m.toUpperCase();
		}
	}
}

var asd = new Singleton({ foo : 123 });
console.log(asd);
console.log(asd.name());
var qwe = new Singleton({ bar : 222 });
console.log(qwe);
console.log(asd === qwe);
console.log('----------------------');
let ChildSingleton = null;
{
	let ChildSingletonID = Symbol('ChildSingletonID');
	ChildSingleton       = class extends Singleton {
		constructor( prop ) {
			super(prop, ChildSingletonID);
			this.m = '2s23';
		}

		name() {
			let qwe = super.name();
			console.log(qwe + ' child');
		}
	}
}
let zxc = new ChildSingleton({ foo : 777 });
console.log(zxc);
let fgh = new ChildSingleton({ bar : 888 });
console.log(fgh);
console.log(fgh.name());
console.log(zxc === fgh);